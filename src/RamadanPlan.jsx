import React, { useState, useEffect } from "react";
import "./RamadanPlan.css";
import { CheckCircle, XCircle } from "lucide-react";

const saharIftarTimes = [
    [
        { "suhoor": "05:40", "iftar": "18:17" },
        { "suhoor": "05:38", "iftar": "18:18" },
        { "suhoor": "05:37", "iftar": "18:19" },
        { "suhoor": "05:35", "iftar": "18:20" },
        { "suhoor": "05:33", "iftar": "18:21" },
        { "suhoor": "05:32", "iftar": "18:22" },
        { "suhoor": "05:30", "iftar": "18:23" },
        { "suhoor": "05:28", "iftar": "18:24" },
        { "suhoor": "05:27", "iftar": "18:25" },
        { "suhoor": "05:25", "iftar": "18:26" },
        { "suhoor": "05:23", "iftar": "18:27" },
        { "suhoor": "05:21", "iftar": "18:28" },
        { "suhoor": "05:20", "iftar": "18:29" },
        { "suhoor": "05:18", "iftar": "18:30" },
        { "suhoor": "05:16", "iftar": "18:31" },
        { "suhoor": "05:14", "iftar": "18:32" },
        { "suhoor": "05:12", "iftar": "18:33" },
        { "suhoor": "05:11", "iftar": "18:34" },
        { "suhoor": "05:09", "iftar": "18:35" },
        { "suhoor": "05:07", "iftar": "18:36" },
        { "suhoor": "05:05", "iftar": "18:37" },
        { "suhoor": "05:03", "iftar": "18:38" },
        { "suhoor": "05:01", "iftar": "18:39" },
        { "suhoor": "05:00", "iftar": "18:40" },
        { "suhoor": "04:58", "iftar": "18:41" },
        { "suhoor": "04:56", "iftar": "18:42" },
        { "suhoor": "04:54", "iftar": "18:43" },
        { "suhoor": "04:52", "iftar": "18:44" },
        { "suhoor": "04:51", "iftar": "18:45" },
        { "suhoor": "04:49", "iftar": "18:46" }
    ]

];

const RamadanPlan = () => {
    const [days, setDays] = useState(() => {
        const savedDays = JSON.parse(localStorage.getItem("ramadanDays"));
        return savedDays || saharIftarTimes.map((time, i) => ({
            day: i + 1,
            fasted: false,
            suhoorTime: time.suhoor,
            iftarTime: time.iftar,
        }));
    });

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        localStorage.setItem("ramadanDays", JSON.stringify(days));
    }, [days]);

    const toggleFasted = (index) => {
        setDays((prevDays) => {
            const updatedDays = prevDays.map((day, i) =>
                i === index ? { ...day, fasted: !day.fasted } : day
            );
            localStorage.setItem("ramadanDays", JSON.stringify(updatedDays));

            // Faqat ro‘za tutgan kunlar uchun modal ochilsin
            if (!prevDays[index].fasted) {
                setShowModal(true);
            }

            return updatedDays;
        });
    };

    return (
        <div className="ramadan-plan">
            <h1>🌙 Ramazon Jadvali</h1>
            <div className="days">
                {days.map((day, index) => (
                    <div key={day.day} className={`day ${day.fasted ? "fasted" : "not-fasted"}`}>
                        <div className="day-header">
                            <h2>Kun {day.day}</h2>
                            <div className="status-icons">
                                <CheckCircle
                                    className={`icon check-icon ${day.fasted ? "active" : ""}`}
                                    onClick={() => toggleFasted(index)}
                                />
                            </div>
                        </div>
                        <div className="times">
                            <h2>🕕 Saharlik: {day.suhoorTime}</h2>
                            <h4 className="dua">Navaytu an asuvma sovma shahro ramazona minal fajri ilal mag‘ribi, xolisan lillahi ta'aalaa, Allohu akbar.</h4>
                            <h2>🌅 Iftorlik: {day.iftarTime}</h2>
                            <h4 className="dua">Allohumma laka sumtu va bika amantu va a'layka tavakkaltu va a'laa rizqika aftortu, fag'firliy ma qoddamtu va maa axxortu</h4>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal" onClick={() => setShowModal(false)}>
                    <div className="modal-content">
                        <h2>🎉 Muborak bo‘lsin!</h2>
                        <p className="tabrik">Bugungi tutgan ro‘zangiz qabul bo‘lsin! 🕌</p>
                        <button onClick={() => setShowModal(false)}>Rahmat</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RamadanPlan;
