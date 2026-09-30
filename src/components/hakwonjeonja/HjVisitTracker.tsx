"use client";

import { useEffect } from "react";
import { getStoredChannel } from "@/lib/inflow";

const SENT_KEY = "hj-visit-sent";
const UNIQUE_KEY = "hj-visited";

export default function HjVisitTracker() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(SENT_KEY)) return;
      sessionStorage.setItem(SENT_KEY, "1");
    } catch {
      // 스토리지 차단 환경에서도 방문 자체는 기록
    }

    let firstVisit = true;
    try {
      firstVisit = !localStorage.getItem(UNIQUE_KEY);
      localStorage.setItem(UNIQUE_KEY, "1");
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
        path: window.location.pathname + window.location.search,
        userAgent: navigator.userAgent,
      }),
      keepalive: true,
    }).catch(() => {
      // 트래킹 실패가 페이지 동작에 영향을 주지 않도록 무시
    });
  }, []);

  return null;
}
