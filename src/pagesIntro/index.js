import PageIntroHash from "./module";

// 页面步骤指导
// 依赖：https://introjs.com/docs/intro/api#introjsoncompleteprovidedcallback
const completeIntroKey = "_MT_Complete_Intro";

let pageCompleteIntro = null;

// 进行页面指导
export default function startPageIntro(routeName) {
  if (!PageIntroHash[routeName] || !window.introJs) return;
  if (!pageCompleteIntro) {
    try {
      pageCompleteIntro =
        JSON.parse(localStorage.getItem(completeIntroKey)) || {};
    } catch (e) {
      pageCompleteIntro = {};
    }
  }
  // 只显示一次
  if (pageCompleteIntro[routeName]) return;
  // eslint-disable-next-line no-undef
  return (window.introduction = introJs()
    .oncomplete(() => {
      window.introduction = null;
      pageCompleteIntro[routeName] = true;
      localStorage.setItem(completeIntroKey, JSON.stringify(pageCompleteIntro));
    })
    .setOptions({
      exitOnEsc: false,
      nextLabel: "下一步",
      prevLabel: "上一步",
      doneLabel: "结束",
      tooltipClass: "mt-intro-class",
      steps: PageIntroHash[routeName](),
    })
    .start());
}
