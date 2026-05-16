import { useEffect, useState } from "react";
import { X } from "lucide-react";
import feesOffer from "../../imports/Fees.jpeg";

const DISMISS_KEY = "admissionFlyerDismissed-v3";

export function AdmissionFlyerPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const alreadyDismissed = localStorage.getItem(DISMISS_KEY) === "true";
    if (!alreadyDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(DISMISS_KEY, "true");
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-0 z-[95] bg-slate-200/75"
        aria-hidden="true"
      />
      <aside
        className="fixed left-1/2 top-1/2 z-[100] w-[340px] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 sm:w-[430px] md:w-[520px] lg:w-[600px] rounded-xl bg-white/95 shadow-2xl ring-1 ring-black/10 backdrop-blur-sm"
        role="dialog"
        aria-label="Admission flyer"
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
          aria-label="Close admission flyer"
        >
          <X className="h-4 w-4" />
        </button>

        <img
          src={feesOffer}
          alt="Special admission offer flyer"
          className="h-auto w-full rounded-xl object-cover"
          loading="eager"
        />
      </aside>
    </>
  );
}
