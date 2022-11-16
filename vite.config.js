import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import { createVuePlugin } from "vite-plugin-vue2";
import progress from "vite-plugin-progress";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
import ViteRequireContext from "@originjs/vite-plugin-require-context";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // const idDev = mode !== "production";
  console.log(env.VITE_APP_BASE_API_URL, mode);
  return {
    plugins: [
      createVuePlugin({
        jsx: true,
      }),
      progress(),
      viteCommonjs(),
      ViteRequireContext(),
      createSvgIconsPlugin({
        // 指定要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), "src/icons/svg")],
        // 执行icon name的格式
        // symbolId: "icon-[dir]-[name]",
        symbolId: "icon-[name]",
      }),
    ], // 配置需要使用的插件列表
    base: mode === "production" ? "./" : "/", // 在生产中服务时的基本公共路径
    publicDir: "public", // 静态资源服务的文件夹, 默认"public"
    define: {
      // "process.env": env, // 打包之后运行项目会报错
      process: { env },
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
        src: resolve(__dirname, "./src"),
        components: resolve(__dirname, "./src/components"),
        assets: resolve(__dirname, "./src/assets"),
        utils: resolve(__dirname, "./src/utils"),
        "@@": resolve(__dirname, "./src/views/ShopManage/views/PageEditor"), //自定义页面的路径 组件层级太多 写相对路径会很长
      },
      extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 处理全局公共样式兼容问题
          additionalData: `@import "./src/assets/styles/variables.scss";
        @import "./src/assets/styles/mixin.scss";`,
        },
      },
    },
    // 引入第三方的配置,强制预构建插件包
    optimizeDeps: {
      include: ["axios"],
    },
    lintOnSave: false,
    // 打包配置
    build: {
      target: "es2015", // 浏览器兼容性
      cssTarget: "chrome79", // 此选项允许用户为 CSS 的压缩设置一个不同的浏览器 target
      chunkSizeWarningLimit: 2000, // chunk 大小警告的限制（以 kbs 为单位）。
      outDir: "dist", // 指定输出路径
      assetsDir: "static", // 指定生成静态资源的存放路径（相对于 build.outDir）。
      manifest: false, // 当设置为 true，构建后将会生成 manifest.json 文件，包含了没有被 hash 的资源文件名和 hash 后版本的映射。可以为一些服务器框架渲染时提供正确的资源引入链接。
      assetsInlineLimit: "4096", // 小于此阈值的导入或引用资源将内联为base64编码，设置为0可禁用此项。默认4096（4kb）
      cssCodeSplit: true, // 启用/禁用CSS代码拆分，如果禁用，整个项目的所有CSS将被提取到一个CSS文件中,默认true
      sourcemap: false, // 构建后是否生成 source map 文件
      minify: "terser", // 混淆器，terser构建后文件体积更小
      rollupOptions: {
        output: {
          chunkFileNames: "js/[name]-[hash].js",
          entryFileNames: "js/[name]-[hash].js",
          assetFileNames: "[ext]/[name]-[hash].[ext]",
        },
      },
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      }, //去除 console debugger
    },
    // 本地运行配置，及反向代理配置
    server: {
      host: "0.0.0.0", // localhost 局域网访问不了
      port: 3000,
      open: false,
      https: false,
      strictPort: false, // 设为 false 时，若端口已被占用则会尝试下一个可用端口,而不是直接退出
      cors: true, // 为开发服务器配置 CORS。默认启用并允许任何源
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      proxy: {
        [env.VITE_APP_API_PREFIX]: {
          target: env.VITE_APP_BASE_API_URL, //代理接口
          changeOrigin: true,
          ws: true,
          rewrite: (path) =>
            path.replace(env.VITE_APP_API_PREFIX, env.VITE_APP_API_PREFIX),
        },
        // "/dsp": {
        //   target: "http://192.168.101.104:9999/", //代理接口
        //   changeOrigin: true,
        //   ws: true,
        //   rewrite: (path) => path.replace(/^\/dsp/, "dsp"),
        // },
      },
    },
  };
});
