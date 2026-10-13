/** 한자 장식 서체 — 필요한 글자만 구글 폰트에서 받는다(붓글씨 北京, 송체 邀请函·第一二三四日) */
const BRUSH = "https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&text=" + encodeURIComponent("北京") + "&display=swap";
const SERIF = "https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@700&text=" + encodeURIComponent("邀请函第一二三四日北京天坛紫禁城") + "&display=swap";

export default function ZhFonts() {
  return (
    <>
      <link rel="stylesheet" href={BRUSH} precedence="default" />
      <link rel="stylesheet" href={SERIF} precedence="default" />
    </>
  );
}
