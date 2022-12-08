import React, { useState } from 'react';

function HexRgb() {

    const init = { hex: '', rgba: [], text: ["", ""] };

    function getHex(hex) {
        const digit = hex.slice(1).split("");
        const r = parseInt([digit[0], digit[1]].join(""), 16);
        const g = parseInt([digit[4], digit[5]].join(""), 16);
        const b = parseInt([digit[2], digit[3]].join(""), 16);
        return [r, g, b];
    }

    const [form, setForm] = useState(init);
    const regexp = /^#[a-fA-F0-9]{6}/;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (regexp.test(form.hex)) {
            setForm((prev) => ({ ...prev, rgba: getHex(form.hex), text: ["rgb(", ")"] }))
        } else if (form.hex.length === 7) {
            setForm((prev) => ({ ...prev, rgba: ["Ошибка!"], text: ["", ""] }))
        }
    }

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, hex: e.target.value }))
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                className="color-hex"
                type="text"
                maxLength="7"
                onChange={handleChange}
                value={form.hex}
            />
            <div className="color-rgb">
                {form.text[0]}
                {form.rgba.join()}
                {form.text[1]}
            </div>

            <style jsx="true">
                {
                    `.form {
                    background: rgba(${form.rgba.length !== 1 ? form.rgba.join() : [204, 0, 20]});
                }`
                }
            </style>
        </form>
    );
}

export default HexRgb;