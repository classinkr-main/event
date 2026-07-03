"use client";

import { useEffect } from "react";
import { getStoredChannel } from "@/lib/inflow";

const SENT_KEY = "incheon-visit-sent";
const UNIQUE_KEY = "incheon-visited";

export default function IncheonVisitTracker() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(SENT_KEY)) return;
      sessionStorage.setItem(SENT_KEY, "1");
    } catch {
      // 스토리지 차단 환경(일부 인앱 브라우저)에서도 방문 자체는 기록
    }

    let firstVisit = true;
    try {
      firstVisit = !localStorage.getItem(UNIQUE_KEY);
      localStorage.setItem(UNIQUE_KEY, "1");
    } catch {
      // localStorage 불가 시 firstVisit=true로 집계 (재방문 과대집계 감수)
    }

    const payload = JSON.stringify({
      channel: getStoredChannel(),
      referrer: document.referrer,
      device: /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
        ? "mobile"
        : "desktop",
      firstVisit,
      path: window.location.pathname + window.location.search,
      userAgent: navigator.userAgent,
    });

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {
      // 트래킹 실패가 페이지 동작에 영향을 주지 않도록 무시
    });
  }, []);

  return null;
}
