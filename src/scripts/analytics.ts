export const trackPageView = async () => {
  // Avoid tracking if in admin path
  if (window.location.pathname.startsWith('/admin')) return;
  // if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') return;

  try {
    const { doc, setDoc, increment } = await import("firebase/firestore");
    const { db } = await import("../lib/firebase");

    const today = new Date().toISOString().split('T')[0];
    const globalRef = doc(db, "analytics", "global");
    const dailyRef = doc(db, "analytics", `daily_${today}`);
    
    await setDoc(globalRef, {
      totalViews: increment(1),
      lastActive: new Date().toISOString()
    }, { merge: true });
    
    await setDoc(dailyRef, {
      views: increment(1),
      date: today
    }, { merge: true });

  } catch (error) {
    console.warn("Analytics tracking failed:", error);
  }
};
