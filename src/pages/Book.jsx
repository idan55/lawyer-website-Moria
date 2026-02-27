import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Book = () => {
  const { i18n, t } = useTranslation();
  const baseLang = i18n.language.split("-")[0];
  const apiBase = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const todayIso = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  const [date, setDate] = useState(todayIso);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [duration, setDuration] = useState(30);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotError, setSlotError] = useState("");
  const [calendarNeedsConnect, setCalendarNeedsConnect] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(t("book.defaultService"));
  const [language, setLanguage] = useState(
    ["en", "fr", "he", "nl"].includes(baseLang) ? baseLang : "en"
  );
  const [bookingError, setBookingError] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [reloadTick, setReloadTick] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchSlots() {
      setLoadingSlots(true);
      setSlotError("");
      setCalendarNeedsConnect(false);
      setSelectedSlot(null);

      try {
        const response = await fetch(
          `${apiBase}/availability?date=${date}&duration=${duration}`,
          { signal: abortController.signal, credentials: "include" }
        );
        const data = await response.json();
        if (!response.ok) {
          if (
            data.code === "GOOGLE_NOT_CONNECTED" ||
            data.code === "GOOGLE_RECONNECT_REQUIRED"
          ) {
            setCalendarNeedsConnect(true);
            throw new Error(t("book.errors.connectCalendar"));
          }
          throw new Error(data.error || t("book.errors.fetchSlots"));
        }
        setSlots(Array.isArray(data.availableSlots) ? data.availableSlots : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setSlotError(err.message || t("book.errors.fetchSlots"));
          setSlots([]);
        }
      } finally {
        setLoadingSlots(false);
      }
    }

    fetchSlots();
    return () => abortController.abort();
  }, [apiBase, date, duration, reloadTick, t]);

  function formatIsoLocal(dateValue) {
    const year = dateValue.getFullYear();
    const month = String(dateValue.getMonth() + 1).padStart(2, "0");
    const day = String(dateValue.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  async function submitBooking(event) {
    event.preventDefault();
    setBookingError("");
    setSuccess(null);

    if (!selectedSlot?.time) {
      setBookingError(t("book.errors.selectSlot"));
      return;
    }

    setBookingLoading(true);

    try {
      const response = await fetch(`${apiBase}/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
          phone,
          service,
          language,
          date,
          start: selectedSlot.time,
          duration,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        if (
          data.code === "GOOGLE_NOT_CONNECTED" ||
          data.code === "GOOGLE_RECONNECT_REQUIRED"
        ) {
          setCalendarNeedsConnect(true);
          throw new Error(t("book.errors.connectCalendar"));
        }
        throw new Error(data.error || t("book.errors.bookFailed"));
      }

      setSuccess(data.appointment);
      setName("");
      setEmail("");
      setPhone("");
      setSelectedSlot(null);
      setReloadTick((current) => current + 1);
    } catch (err) {
      setBookingError(err.message || t("book.errors.bookFailed"));
    } finally {
      setBookingLoading(false);
    }
  }

  return (
    <section className="section_contact">
      <div className="page-padding">
        <div className="container-large">
          <div className="padding-vertical-large space-y-6">
            <div>
              <p className="eyebrow">{t("book.eyebrow")}</p>
              <h1 className="section-title">{t("book.title")}</h1>
              <p className="section-copy">{t("book.subtitle")}</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
              <article className="content-card space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="field">
                    <span>{t("book.fields.date")}</span>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(pickedDate) => {
                        if (!pickedDate) return;
                        setSelectedDate(pickedDate);
                        setDate(formatIsoLocal(pickedDate));
                      }}
                      minDate={new Date()}
                      dateFormat="yyyy-MM-dd"
                      className="booking-datepicker-input"
                      calendarClassName="booking-datepicker-calendar"
                      popperClassName="booking-datepicker-popper"
                      showPopperArrow={false}
                    />
                  </label>

                  <label className="field">
                    <span>{t("book.fields.duration")}</span>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                    >
                      <option value={30}>30 {t("book.minutes")}</option>
                      <option value={60}>60 {t("book.minutes")}</option>
                    </select>
                  </label>
                </div>

                <div className="space-y-3">
                  <h2 className="card-title">{t("book.available")}</h2>
                  {loadingSlots ? <p className="card-copy">{t("book.loading")}</p> : null}
                  {slotError ? <p className="error-text">{slotError}</p> : null}
                  {calendarNeedsConnect ? (
                    <a
                      className="ghost-button inline-flex"
                      href={`${apiBase}/auth/google`}
                    >
                      {t("book.connectGoogle")}
                    </a>
                  ) : null}

                  <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
                    {slots.map((slot) => (
                      <button
                        key={slot.start}
                        type="button"
                        className={`slot-chip ${
                          selectedSlot?.start === slot.start ? "slot-chip-active" : ""
                        }`}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>

                  {!loadingSlots && !slotError && slots.length === 0 ? (
                    <p className="card-copy">{t("book.noSlots")}</p>
                  ) : null}
                </div>
              </article>

              <article className="content-card">
                <form className="space-y-3" onSubmit={submitBooking}>
                  <label className="field">
                    <span>{t("book.fields.name")}</span>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>

                  <label className="field">
                    <span>{t("book.fields.email")}</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>

                  <label className="field">
                    <span>{t("book.fields.phone")}</span>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </label>

                  <label className="field">
                    <span>{t("book.fields.service")}</span>
                    <input
                      type="text"
                      required
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                    />
                  </label>

                  <label className="field">
                    <span>{t("book.fields.language")}</span>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option value="en">{t("book.languages.en")}</option>
                      <option value="fr">{t("book.languages.fr")}</option>
                      <option value="he">{t("book.languages.he")}</option>
                      <option value="nl">{t("book.languages.nl")}</option>
                    </select>
                  </label>

                  {bookingError ? <p className="error-text">{bookingError}</p> : null}
                  <button
                    type="submit"
                    className="cta-button w-full"
                    disabled={bookingLoading}
                  >
                    {bookingLoading ? t("book.submitting") : t("book.submit")}
                  </button>
                </form>
              </article>
            </div>

            {success ? (
              <article className="success-panel">
                <h2>{t("book.successTitle")}</h2>
                <p>
                  {t("book.successBody", {
                    date: new Date(success.start_time).toLocaleDateString(),
                    time: new Date(success.start_time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                  })}
                </p>
              </article>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Book;
