"use client";

import { useEffect } from "react";
import { getStoredChannel } from "@/lib/inflow";

/**
 * 방문 기록 — 같은 세션에서 같은 path는 한 번만 보낸다.
 */
export default function BjVisitTracker({ path }: { path: string }) {
  useEffect(() => {
    const sentKey = `bj-visit-sent:${path}`;
    const uniqueKey = "bj-visited";
    try {
      if (sessionStorage.getItem(sentKey)) return;
      sessionStorage.setItem(sentKey, "1");
    } catch {
      // 스토리지 차단 환경(일부 인앱 브라우저)에서도 방문 자체는 기록
    }

    let firstVisit = true;
    try {
      firstVisit = !localStorage.getItem(uniqueKey);
      localStorage.setItem(uniqueKey, "1");
    } catch {
      // localStorage 불가 시 firstVisit=true로 집계
    }

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        channel: getStoredChannel(),
        referrer: document.referrer,
        device: /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? "mobile" : "desktop",
        firstVisit,
        path: path + window.location.search,
        userAgent: navigator.userAgent,
      }),
      keepalive: true,
    }).catch(() => {
      // 트래킹 실패가 페이지 동작에 영향을 주지 않도록 무시
    });
  }, [path]);

  return null;
}
