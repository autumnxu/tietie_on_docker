import React from "react";

import Hero from "./Hero";
import LandingLayout from "./landingLayout";

export default function Landing() {
  return (
    <LandingLayout>
      <Hero
        title=" 欢迎大家来到“我在华大”（内测中），希望这里分享的信息能够帮助到你。"
        subtitle1="大家好！这里是版主梧桐 和 autumn：）更新日期：4/13/2022
      网站仍处于内测阶段，可能会出现bug，服务器也是免费的，如有卡顿，请刷新..."
        subtitle2="赠人玫瑰手有余香。发帖：+2exp看帖 ：-1 exp,，也是希望大家在收到信息的同时，乐于分享！！！"
        image="https://source.unsplash.com/collection/404339/800x600"
      />
    </LandingLayout>
  );
}
