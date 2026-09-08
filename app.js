// Model Evaluation Data
const modelsData = [
    {
        rank: 1,
        name: "Gemini 3.1 Pro",
        logic: 405,
        prose: 470,
        flexibility: 480,
        knowledge: 500,
        context: "1M",
        desc: "Absolute best at prose, canon knowledge recall, and content flexibility. Resists earned character development, slight instruction-following drift."
    },
    {
        rank: 2,
        name: "Gemini 3.7 Flash",
        logic: 390,
        prose: 430,
        flexibility: 490,
        knowledge: 480,
        context: "1M",
        desc: "Slightly weaker logic than 3.1 Pro, but the flexibility champion. More concise, resistant to sycophancy, with rapid punchy prose."
    },
    {
        rank: 3,
        name: "Kimi k3",
        logic: 500,
        prose: 400,
        flexibility: 250,
        knowledge: 420,
        context: "256k (1M API)",
        desc: "Number one in logic, decent at prose. Heavy CoT reasoning tax."
    },
    {
        rank: 4,
        name: "GLM 5.3",
        logic: 510,
        prose: 360,
        flexibility: 420,
        knowledge: 380,
        context: "200k (1M API)",
        desc: "Better in logic than Kimi by a little, worse at prose than Kimi (meh), and solid flexibility."
    },
    {
        rank: 5,
        name: "Opus 4.8",
        logic: 480,
        prose: 380,
        flexibility: 350,
        knowledge: 350,
        context: "200k (1M API)",
        desc: "Superior logic compared to Opus 4.6 and Opus 5. The logic king of Anthropic."
    },
    {
        rank: 6,
        name: "Opus 4.6",
        logic: 460,
        prose: 400,
        flexibility: 350,
        knowledge: 340,
        context: "200k (1M API)",
        desc: "Decent logic, slightly better than 4.8 in prose."
    },
    {
        rank: 7,
        name: "Gemini 3 Flash",
        logic: 320,
        prose: 420,
        flexibility: 450,
        knowledge: 400,
        context: "1M",
        desc: "Very flexible. Amazing lightweight model."
    },
    {
        rank: 8,
        name: "DeepSeek v4",
        logic: 150,
        prose: 400,
        flexibility: 480,
        knowledge: 270,
        context: "1M",
        desc: "Great flexibility, lower logic consistency."
    },
    {
        rank: 9,
        name: "Opus 5",
        logic: 400,
        prose: 300,
        flexibility: 200,
        knowledge: 360,
        context: "200k (1M API)",
        desc: "Highly capable logic, but very limited flexibility and dry prose."
    },
    {
        rank: 10,
        name: "Gemini 3.5 Flash",
        logic: 380,
        prose: 350,
        flexibility: 350,
        knowledge: 440,
        context: "1M",
        desc: "Solid step up in logic from 3 Flash."
    },
    {
        rank: 11,
        name: "GLM 5.2",
        logic: 380,
        prose: 300,
        flexibility: 250,
        knowledge: 300,
        context: "200k",
        desc: "Sits below Opus 4.6/5 in logic, stiffer prose."
    },
    {
        rank: 12,
        name: "Gemini 3.6 Flash",
        logic: 300,
        prose: 320,
        flexibility: 370,
        knowledge: 460,
        context: "1M-2M",
        desc: "Excellent long-context needle retrieval."
    },
    {
        rank: 13,
        name: "Muse Spark 1.1",
        logic: 360,
        prose: 300,
        flexibility: 330,
        knowledge: 290,
        context: "1M",
        desc: "Well-balanced overall baseline."
    },
    {
        rank: 14,
        name: "Sonnet 4.6",
        logic: 350,
        prose: 320,
        flexibility: 300,
        knowledge: 320,
        context: "200k (1M API)",
        desc: "Good general benchmark baseline, stiffer narrative prose."
    },
    {
        rank: 15,
        name: "Qwen 3.8 Max",
        logic: 200,
        prose: 350,
        flexibility: 150,
        knowledge: 250,
        context: "1M",
        desc: "Capable prose styling, constrained flexibility."
    },
    {
        rank: 16,
        name: "ChatGPT 5.6 Sol Max",
        logic: 50,
        prose: 250,
        flexibility: 100,
        knowledge: 200,
        context: "256k (1M API)",
        desc: "Baseline retrieval champion, but high creative hallucination severity rate."
    }
];

// Baseline values for percentage and multiplier calculations
const BASES = {
    logic: 50,
    prose: 250,
    flexibility: 100,
    knowledge: 200
};

// Brand Icon and Logo mapping helper
function getBrandLogoInfo(modelName) {
    const name = modelName.toLowerCase();
    if (name.includes('gemini')) {
        return {
            letter: 'G',
            bg: 'rgba(49, 134, 255, 0.15)',
            color: '#3186ff',
            img: 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjFlbSIgc3R5bGU9ImZsZXg6bm9uZTtsaW5lLWhlaWdodDoxIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxZW0iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRpdGxlPkdlbWluaTwvdGl0bGU+PHBhdGggZD0iTTIwLjYxNiAxMC44MzVhMTQuMTQ3IDE0LjE0NyAwIDAxLTQuNDUtMy4wMDEgMTQuMTExIDE0LjExMSAwIDAxLTMuNjc4LTYuNDUyLjUwMy41MDMgMCAwMC0uOTc1IDAgMTQuMTM0IDE0LjEzNCAwIDAxLTMuNjc5IDYuNDUyIDE0LjE1NSAxNC4xNTUgMCAwMS00LjQ1IDMuMDAxYy0uNjUuMjgtMS4zMTguNTA1LTIuMDAyLjY3OGEuNTAyLjUwMiAwIDAwMCAuOTc1Yy42ODQuMTcyIDEuMzUuMzk3IDIuMDAyLjY3N2ExNC4xNDcgMTQuMTQ3IDAgMDE0LjQ1IDMuMDAxIDE0LjExMiAxNC4xMTIgMCAwMTMuNjc5IDYuNDUzLjUwMi41MDIgMCAwMC45NzUgMGMuMTcyLS42ODUuMzk3LTEuMzUxLjY3Ny0yLjAwM2ExNC4xNDUgMTQuMTQ1IDAgMDEzLjAwMS00LjQ1IDE0LjExMyAxNC4xMTMgMCAwMTYuNDUzLTMuNjc4LjUwMy41MDMgMCAwMDAtLjk3NSAxMy4yNDUgMTMuMjQ1IDAgMDEtMi4wMDMtLjY3OHoiIGZpbGw9IiMzMTg2RkYiPjwvcGF0aD48cGF0aCBkPSJNMjAuNjE2IDEwLjgzNWExNC4xNDcgMTQuMTQ3IDAgMDEtNC40NS0zLjAwMSAxNC4xMTEgMTQuMTExIDAgMDEtMy42NzgtNi40NTIuNTAzLjUwMyAwIDAwLS45NzUgMCAxNC4xMzQgMTQuMTM0IDAgMDEtMy42NzkgNi40NTIgMTQuMTU1IDE0LjE1NSAwIDAxLTQuNDUgMy4wMDFjLS42NS4yOC0xLjMxOC41MDUtMi4wMDIuNjc4YS41MDIuNTAyIDAgMDAwIC45NzVjLjY4NC4xNzIgMS4zNS4zOTcgMi4wMDIuNjc3YTE0LjE0NyAxNC4xNDcgMCAwMTQuNDUgMy4wMDEgMTQuMTEyIDE0LjExMiAwIDAxMy42NzkgNi40NTMuNTAyLjUwMiAwIDAwLjk3NSAwYy4xNzItLjY4NS4zOTctMS4zNTEuNjc3LTIuMDAzYTE0LjE0NSAxNC4xNDUgMCAwMTMuMDAxLTQuNDUgMTQuMTEzIDE0LjExMyAwIDAxNi40NTMtMy42NzguNTAzLjUwMyAwIDAwMC0uOTc1IDEzLjI0NSAxMy4yNDUgMCAwMS0yLjAwMy0uNjc4eiIgZmlsbD0idXJsKCNsb2JlLWljb25zLWdlbWluaS0wLV9SXzBfKSI+PC9wYXRoPjxwYXRoIGQ9Ik0yMC42MTYgMTAuODM1YTE0LjE0NyAxNC4xNDcgMCAwMS00LjQ1LTMuMDAxIDE0LjExMSAxNC4xMTEgMCAwMS0zLjY3OC02LjQ1Mi41MDMuNTAzIDAgMDAtLjk3NSAwIDE0LjEzNCAxNC4xMzQgMCAwMS0zLjY3OSA2LjQ1MiAxNC4xNTUgMTQuMTU1IDAgMDEtNC40NSAzLjAwMWMtLjY1LjI4LTEuMzE4LjUwNS0yLjAwMi42NzhhLjUwMi41MDIgMCAwMDAgLjk3NWMuNjg0LjE3MiAxLjM1LjM5NyAyLjAwMi42NzdhMTQuMTQ3IDE0LjE0NyAwIDAxNC40NSAzLjAwMSAxNC4xMTIgMTQuMTEyIDAgMDEzLjY3OSA2LjQ1My41MDIuNTAyIDAgMDAuOTc1IDBjLjE3Mi0uNjg1LjM5Ny0xLjM1MS42NzctMi4wMDNhMTQuMTQ1IDE0LjE0NSAwIDAxMy4wMDEtNC40NSAxNC4xMTMgMTQuMTEzIDAgMDE2LjQ1My0zLjY3OC41MDMuNTAzIDAgMDAwLS45NzUgMTMuMjQ1IDEzLjI0NSAwIDAxLTIuMDAzLS42Nzh6IiBmaWxsPSJ1cmwoI2xvYmUtaWNvbnMtZ2VtaW5pLTEtX1JfMF8pIj48L3BhdGg+PHBhdGggZD0iTTIwLjYxNiAxMC44MzVhMTQuMTQ3IDE0LjE0NyAwIDAxLTQuNDUtMy4wMDEgMTQuMTExIDE0LjExMSAwIDAxLTMuNjc4LTYuNDUyLjUwMy41MDMgMCAwMC0uOTc1IDAgMTQuMTM0IDE0LjEzNCAwIDAxLTMuNjc5IDYuNDUyIDE0LjE1NSAxNC4xNTUgMCAwMS00LjQ1IDMuMDAxYy0uNjUuMjgtMS4zMTguNTA1LTIuMDAyLjY3OGEuNTAyLjUwMiAwIDAwMCAuOTc1Yy42ODQuMTcyIDEuMzUuMzk3IDIuMDAyLjY3N2ExNC4xNDcgMTQuMTQ3IDAgMDE0LjQ1IDMuMDAxIDE0LjExMiAxNC4xMTIgMCAwMTMuNjc5IDYuNDUzLjUwMi41MDIgMCAwMC45NzUgMGMuMTcyLS42ODUuMzk3LTEuMzUxLjY3Ny0yLjAwM2ExNC4xNDUgMTQuMTQ1IDAgMDEzLjAwMS00LjQ1IDE0LjExMyAxNC4xMTMgMCAwMTYuNDUzLTMuNjc4LjUwMy41MDMgMCAwMDAtLjk3NSAxMy4yNDUgMTMuMjQ1IDAgMDEtMi4wMDMtLjY3OHoiIGZpbGw9InVybCgjbG9iZS1pY29ucy1nZW1pbmktMi1fUl8wXykiPjwvcGF0aD48ZGVmcz48bGluZWFyR3JhZGllbnQgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJsb2JlLWljb25zLWdlbWluaS0wLV9SXzBfIiB4MT0iNyIgeDI9IjExIiB5MT0iMTUuNSIgeTI9IjEyIj48c3RvcCBzdG9wLWNvbG9yPSIjMDhCOTYyIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDhCOTYyIiBzdG9wLW9wYWNpdHk9IjAiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImxvYmUtaWNvbnMtZ2VtaW5pLTEtX1JfMF8iIHgxPSI4IiB4Mj0iMTEuNSIgeTE9IjUuNSIgeTI9IjExIj48c3RvcCBzdG9wLWNvbG9yPSIjRjk0NTQzIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRjk0NTQzIiBzdG9wLW9wYWNpdHk9IjAiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImxvYmUtaWNvbnMtZ2VtaW5pLTItX1JfMF8iIHgxPSIzLjUiIHgyPSIxNy41IiB5MT0iMTMuNSIgeTI9IjEyIj48c3RvcCBzdG9wLWNvbG9yPSIjRkFCQzEyIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIuNDYiIHN0b3AtY29sb3I9IiNGQUJDMTIiIHN0b3Atb3BhY2l0eT0iMCI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjwvc3ZnPg=='
        };
    } else if (name.includes('chatgpt') || name.includes('gpt')) {
        return {
            letter: 'O',
            bg: 'linear-gradient(135deg, #10a37f, #0d8a6a)',
            color: '#ffffff',
            img: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGhlaWdodD0iMWVtIiBzdHlsZT0iZmxleDpub25lO2xpbmUtaGVpZ2h0OjEiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjFlbSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+T3BlbkFJPC90aXRsZT48cGF0aCBkPSJNOS4yMDUgOC42NTh2LTIuMjZjMC0uMTkuMDcyLS4zMzMuMjM4LS40MjhsNC41NDMtMi42MTZjLjYxOS0uMzU3IDEuMzU2LS41MjMgMi4xMTctLjUyMyAyLjg1NCAwIDQuNjYyIDIuMjEyIDQuNjYyIDQuNTY2IDAgLjE2NyAwIC4zNTctLjAyNC41NDdsLTQuNzEtMi43NTlhLjc5Ny43OTcgMCAwMC0uODU2IDBsLTUuOTcgMy40NzN6bTEwLjYwOSA4LjhWMTIuMDZjMC0uMzMzLS4xNDMtLjU3LS40MjktLjczN2wtNS45Ny0zLjQ3MyAxLjk1LTEuMTE4YS40MzMuNDMzIDAgMDEuNDc2IDBsNC41NDMgMi42MTdjMS4zMDkuNzYgMi4xODkgMi4zNzggMi4xODkgMy45NDggMCAxLjgwOC0xLjA3IDMuNDczLTIuNzYgNC4xNjN6TTcuODAyIDEyLjcwM2wtMS45NS0xLjE0MmMtLjE2Ny0uMDk1LS4yMzktLjIzOC0uMjM5LS40MjhWNS44OTljMC0yLjU0NSAxLjk1LTQuNDcyIDQuNTkxLTQuNDcyIDEgMCAxLjkyNy4zMzMgMi43MTIuOTI4TDguMjMgNS4wNjdjLS4yODUuMTY2LS40MjguNDA0LS40MjguNzM3djYuODk4ek0xMiAxNS4xMjhsLTIuNzk1LTEuNTd2LTMuMzNMMTIgOC42NThsMi43OTUgMS41N3YzLjMzTDEyIDE1LjEyOHptMS43OTYgNy4yM2MtMSAwLTEuOTI3LS4zMzItMi43MTItLjkyN2w0LjY4Ni0yLjcxMmMuMjg1LS4xNjYuNDI4LS40MDQuNDI4LS43Mzd2LTYuODk4bDEuOTc0IDEuMTQyYy4xNjcuMDk1LjIzOC4yMzguMjM4LjQyOHY1LjIzM2MwIDIuNTQ1LTEuOTc0IDQuNDcyLTQuNjE0IDQuNDcyem0tNS42MzctNS4zMDNsLTQuNTQ0LTIuNjE3Yy0xLjMwOC0uNzYxLTIuMTg4LTIuMzc4LTIuMTg4LTMuOTQ4QTQuNDgyIDQuNDgyIDAgMDE0LjIxIDYuMzI3djUuNDIzYzAgLjMzMy4xNDMuNTcxLjQyOC43MzhsNS45NDcgMy40NDktMS45NSAxLjExOGEuNDMyLjQzMiAwIDAxLS40NzYgMHptLS4yNjIgMy45Yy0yLjY4OCAwLTQuNjYyLTIuMDIxLTQuNjYyLTQuNTE5IDAtLjE5LjAyNC0uMzguMDQ3LS41N2w0LjY4NiAyLjcxYy4yODYuMTY3LjU3MS4xNjcuODU2IDBsNS45Ny0zLjQ0OHYyLjI2YzAgLjE5LS4wNy4zMzMtLjIzNy40MjhsLTQuNTQzIDIuNjE2Yy0uNjE5LjM1Ny0xLjM1Ni41MjMtMi4xMTcuNTIzem01Ljg5OSAyLjgzYTUuOTQ3IDUuOTQ3IDAgMDA1LjgyNy00Ljc1NkMyMi4yODcgMTguMzM5IDI0IDE1Ljg0IDI0IDEzLjI5NmMwLTEuNjY1LS43MTMtMy4yODItMS45OTgtNC40NDguMTE5LS41LjE5LS45OTkuMTktMS40OTggMC0zLjQwMS0yLjc1OS01Ljk0Ny01Ljk0Ni01Ljk0Ny0uNjQyIDAtMS4yNi4wOTUtMS44OC4zMUE1Ljk2MiA1Ljk2MiAwIDAwMTAuMjA1IDBhNS45NDcgNS45NDcgMCAwMC01LjgyNyA0Ljc1N0MxLjcxMyA1LjQ0NyAwIDcuOTQ1IDAgMTAuNDljMCAxLjY2Ni43MTMgMy4yODMgMS45OTggNC40NDgtLjExOS41LS4xOSAxLS4xOSAxLjQ5OSAwIDMuNDAxIDIuNzU5IDUuOTQ2IDUuOTQ2IDUuOTQ2LjY0MiAwIDEuMjYtLjA5NSAxLjg4LS4zMDlhNS45NiA1Ljk2IDAgMDA0LjE2MiAxLjcxM3oiPjwvcGF0aD48L3N2Zz4='
        };
    } else if (name.includes('opus') || name.includes('sonnet') || name.includes('claude')) {
        return {
            letter: 'A',
            bg: 'rgba(217, 119, 87, 0.15)',
            color: '#d97757',
            img: 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjFlbSIgc3R5bGU9ImZsZXg6bm9uZTtsaW5lLWhlaWdodDoxIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxZW0iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRpdGxlPkNsYXVkZTwvdGl0bGU+PHBhdGggZD0iTTQuNzA5IDE1Ljk1NWw0LjcyLTIuNjQ3LjA4LS4yMy0uMDgtLjEyOEg5LjJsLS43OS0uMDQ4LTIuNjk4LS4wNzMtMi4zMzktLjA5Ny0yLjI2Ni0uMTIyLS41NzEtLjEyMUwwIDExLjc4NGwuMDU1LS4zNTIuNDgtLjMyMS42ODYuMDYgMS41Mi4xMDMgMi4yNzguMTU4IDEuNjUyLjA5NyAyLjQ0OS4yNTVoLjM4OWwuMDU1LS4xNTctLjEzNC0uMDk4LS4xMDMtLjA5Ny0yLjM1OC0xLjU5Ni0yLjU1Mi0xLjY4OC0xLjMzNi0uOTcyLS43MjQtLjQ5MS0uMzY0LS40NjItLjE1OC0xLjAwOC42NTYtLjcyMi44ODEuMDYuMjI1LjA2MS44OTMuNjg2IDEuOTA4IDEuNDc2IDIuNDkxIDEuODMzLjM2NS4zMDQuMTQ1LS4xMDMuMDE5LS4wNzMtLjE2NC0uMjc0LTEuMzU1LTIuNDQ2LTEuNDQ2LTIuNDktLjY0NC0xLjAzMi0uMTctLjYxOWEyLjk3IDIuOTcgMCAwMS0uMTA0LS43MjlMNi4yODMuMTM0IDYuNjk2IDBsLjk5Ni4xMzQuNDIuMzY0LjYyIDEuNDE0IDEuMDAyIDIuMjI5IDEuNTU1IDMuMDMuNDU2Ljg5OC4yNDMuODMyLjA5MS4yNTVoLjE1OFY5LjAxbC4xMjgtMS43MDYuMjM3LTIuMDk1LjIzLTIuNjk1LjA4LS43Ni4zNzYtLjkxLjc0Ny0uNDkyLjU4NC4yOC40OC42ODUtLjA2Ny40NDQtLjI4NiAxLjg1MS0uNTU5IDIuOTAzLS4zNjQgMS45NDJoLjIxMmwuMjQzLS4yNDIuOTg1LTEuMzA2IDEuNjUyLTIuMDY0LjczLS44Mi44NS0uOTA0LjU0Ny0uNDMxaDEuMDMzbC43NiAxLjEyOS0uMzQgMS4xNjYtMS4wNjQgMS4zNDctLjg4MSAxLjE0Mi0xLjI2NCAxLjctLjc5IDEuMzYuMDczLjExLjE4OC0uMDIgMi44NTYtLjYwNiAxLjU0My0uMjggMS44NDEtLjMxNS44MzMuMzg4LjA5MS4zOTUtLjMyOC44MDctMS45NjkuNDg2LTIuMzA5LjQ2Mi0zLjQzOS44MTMtLjA0Mi4wMy4wNDkuMDYxIDEuNTQ5LjE0Ni42NjIuMDM2aDEuNjIybDMuMDIuMjI1Ljc5LjUyMi40NzQuNjM4LS4wNzkuNDg1LTEuMjE1LjYyLTEuNjQtLjM4OS0zLjgyOS0uOTEtMS4zMTItLjMyOWgtLjE4MnYuMTFsMS4wOTMgMS4wNjggMi4wMDYgMS44MSAyLjUwOSAyLjMzLjEyNy41NzgtLjMyMi40NTUtLjM0LS4wNDktMi4yMDUtMS42NTctLjg1MS0uNzQ3LTEuOTI2LTEuNjJoLS4xMjh2LjE3bC40NDQuNjQ5IDIuMzQ1IDMuNTIxLjEyMiAxLjA4LS4xNy4zNTMtLjYwOC4yMTMtLjY2OC0uMTIyLTEuMzc0LTEuOTI1LTEuNDE1LTIuMTY3LTEuMTQzLTEuOTQzLS4xNC4wOC0uNjc0IDcuMjU0LS4zMTYuMzctLjcyOS4yOC0uNjA3LS40NjEtLjMyMi0uNzQ3LjMyMi0xLjQ3Ni4zODktMS45MjQuMzE1LTEuNTMuMjg2LTEuOS4xNy0uNjMyLS4wMTItLjA0Mi0uMTQuMDE4LTEuNDM0IDEuOTY3LTIuMTggMi45NDUtMS43MjYgMS44NDUtLjQxNC4xNjQtLjcxNy0uMzcuMDY3LS42NjIuNDAxLS41ODkgMi4zODgtMy4wMzYgMS40NC0xLjg4Mi45My0xLjA4Ni0uMDA2LS4xNThoLS4wNTVMNC4xMzIgMTguNTZsLTEuMTMuMTQ2LS40ODctLjQ1Ni4wNjEtLjc0Ni4yMzEtLjI0MyAxLjkwOC0xLjMxMi0uMDA2LjAwNnoiIGZpbGw9IiNEOTc3NTciIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPjwvc3ZnPg=='
        };
    } else if (name.includes('deepseek')) {
        return {
            letter: 'D',
            bg: 'rgba(77, 107, 254, 0.15)',
            color: '#4d6bfe',
            img: 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjFlbSIgc3R5bGU9ImZsZXg6bm9uZTtsaW5lLWhlaWdodDoxIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxZW0iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRpdGxlPkRlZXBTZWVrPC90aXRsZT48cGF0aCBkPSJNMjMuNzQ4IDQuNDgyYy0uMjU0LS4xMjQtLjM2NC4xMTMtLjUxMi4yMzQtLjA1MS4wMzktLjA5NC4wOS0uMTM3LjEzNi0uMzcyLjM5Ny0uODA2LjY1Ny0xLjM3My42MjYtLjgyOS0uMDQ2LTEuNTM3LjIxNC0yLjE2My44NDgtLjEzMy0uNzgyLS41NzUtMS4yNDgtMS4yNDctMS41NDgtLjM1Mi0uMTU2LS43MDgtLjMxMS0uOTU1LS42NS0uMTcyLS4yNDEtLjIxOS0uNTEtLjMwNS0uNzc0LS4wNTUtLjE2LS4xMS0uMzIzLS4yOTMtLjM1LS4yLS4wMzEtLjI3OC4xMzYtLjM1Ni4yNzYtLjMxMy41NzItLjQzNCAxLjIwMi0uNDIyIDEuODQuMDI3IDEuNDM2LjYzMyAyLjU4IDEuODM4IDMuMzkzLjEzNy4wOTMuMTcyLjE4Ny4xMjkuMzIzLS4wODIuMjgtLjE4LjU1Mi0uMjY2LjgzMy0uMDU1LjE3OS0uMTM3LjIxNy0uMzI5LjE0YTUuNTI2IDUuNTI2IDAgMDEtMS43MzYtMS4xOGMtLjg1Ny0uODI4LTEuNjMxLTEuNzQyLTIuNTk3LTIuNDU4YTExLjM2NSAxMS4zNjUgMCAwMC0uNjg5LS40NzFjLS45ODUtLjk1Ny4xMy0xLjc0My4zODgtMS44MzYuMjctLjA5OC4wOTMtLjQzMi0uNzc5LS40MjgtLjg3Mi4wMDQtMS42Ny4yOTUtMi42ODcuNjg0YTMuMDU1IDMuMDU1IDAgMDEtLjQ2NS4xMzcgOS41OTcgOS41OTcgMCAwMC0yLjg4My0uMTAyYy0xLjg4NS4yMS0zLjM5IDEuMTAyLTQuNDk3IDIuNjIzQy4wODIgOC42MDYtLjIzMSAxMC42ODQuMTUyIDEyLjg1Yy40MDMgMi4yODQgMS41NjkgNC4xNzUgMy4zNiA1LjY1MyAxLjg1OCAxLjUzMyAzLjk5NyAyLjI4NCA2LjQzOCAyLjE0IDEuNDgyLS4wODUgMy4xMzMtLjI4NCA0Ljk5NC0xLjg2LjQ3LjIzNC45NjIuMzI3IDEuNzguMzk3LjYzLjA1OSAxLjIzNi0uMDMgMS43MDUtLjEyOC43MzUtLjE1Ni42ODQtLjgzNy40MTktLjk2MS0yLjE1NS0xLjAwNC0xLjY4Mi0uNTk1LTIuMTEzLS45MjYgMS4wOTYtMS4yOTYgMi43NDYtMi42NDIgMy4zOTItNy4wMDMuMDUtLjM0Ny4wMDctLjU2NSAwLS44NDUtLjAwNC0uMTcuMDM1LS4yMzcuMjMtLjI1NmE0LjE3MyA0LjE3MyAwIDAwMS41NDUtLjQ3NWMxLjM5Ni0uNzYzIDEuOTYtMi4wMTUgMi4wOTMtMy41MTcuMDItLjIzLS4wMDQtLjQ2Ny0uMjQ3LS41ODh6TTExLjU4MSAxOGMtMi4wODktMS42NDItMy4xMDItMi4xODMtMy41Mi0yLjE2LS4zOTIuMDI0LS4zMjEuNDcxLS4yMzUuNzYzLjA5LjI4OC4yMDcuNDg2LjM3MS43MzkuMTE0LjE2Ny4xOTIuNDE2LS4xMTMuNjAzLS42NzMuNDE2LTEuODQyLS4xNC0xLjg5Ny0uMTY3LTEuMzYxLS44MDItMi41LTEuODYtMy4zMDEtMy4zMDctLjc3NC0xLjM5My0xLjIyNC0yLjg4Ny0xLjI5OC00LjQ4Mi0uMDItLjM4Ni4wOTMtLjUyMi40NzctLjU5MmE0LjY5NiA0LjY5NiAwIDAxMS41MjktLjAzOWMyLjEzMi4zMTIgMy45NDYgMS4yNjUgNS40NjggMi43NzQuODY4Ljg2IDEuNTI1IDEuODg3IDIuMjAyIDIuODkxLjcyIDEuMDY2IDEuNDk0IDIuMDgyIDIuNDggMi45MTQuMzQ4LjI5Mi42MjUuNTE0Ljg5MS42NzctLjgwMi4wOS0yLjE0LjExLTMuMDU0LS42MTR6bTEtNi40NGEuMzA2LjMwNiAwIDAxLjQxNS0uMjg3LjMwMi4zMDIgMCAwMS4yLjI4OC4zMDYuMzA2IDAgMDEtLjMxLjMwNy4zMDMuMzAzIDAgMDEtLjMwNC0uMzA4em0zLjExIDEuNTk2Yy0uMi4wODEtLjM5OS4xNTEtLjU5LjE2YTEuMjQ1IDEuMjQ1IDAgMDEtLjc5OC0uMjU0Yy0uMjc0LS4yMy0uNDctLjM1OC0uNTUyLS43NThhMS43MyAxLjczIDAgMDEuMDE2LS41ODhjLjA3LS4zMjctLjAwOC0uNTM3LS4yMzktLjcyNy0uMTg3LS4xNTYtLjQyNi0uMTk5LS42ODgtLjE5OWEuNTU5LjU1OSAwIDAxLS4yNTQtLjA3OGMtLjExLS4wNTQtLjItLjE5LS4xMTQtLjM1OC4wMjgtLjA1NC4xNi0uMTg2LjE5Mi0uMjEuMzU2LS4yMDIuNzY3LS4xMzYgMS4xNDYuMDE2LjM1Mi4xNDQuNjE4LjQwOCAxLjAwMS43ODIuMzkxLjQ1MS40NjIuNTc2LjY4NS45MTQuMTc2LjI2NS4zMzYuNTM3LjQ0NS44NDguMDY3LjE5NS0uMDE5LjM1NC0uMjUuNDUyeiIgZmlsbD0iIzRENkJGRSI+PC9wYXRoPjwvc3ZnPg=='
        };
    } else if (name.includes('kimi')) {
        return {
            letter: 'K',
            bg: 'linear-gradient(135deg, #1783ff, #0056b3)',
            color: '#ffffff',
            img: 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjFlbSIgc3R5bGU9ImZsZXg6bm9uZTtsaW5lLWhlaWdodDoxIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxZW0iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRpdGxlPktpbWk8L3RpdGxlPjxwYXRoIGQ9Ik0yMS44NDYgMGExLjkyMyAxLjkyMyAwIDExMCAzLjg0NkgyMC4xNWEuMjI2LjIyNiAwIDAxLS4yMjctLjIyNlYxLjkyM0MxOS45MjMuODYxIDIwLjc4NCAwIDIxLjg0NiAweiIgZmlsbD0iIzE3ODNGRiI+PC9wYXRoPjxwYXRoIGQ9Ik0xMS4wNjUgMTEuMTk5bDcuMjU3LTcuMmMuMTM3LS4xMzYuMDYtLjQxLS4xMTYtLjQxSDE0LjNhLjE2NC4xNjQgMCAwMC0uMTE3LjA1MWwtNy44MiA3Ljc1NmMtLjEyMi4xMi0uMzAyLjAxMy0uMzAyLS4xNzlWMy44MmMwLS4xMjctLjA4My0uMjMtLjE4NS0uMjNIMy4xODZjLS4xMDMgMC0uMTg2LjEwMy0uMTg2LjIzVjE5Ljc3YzAgLjEyOC4wODMuMjMuMTg2LjIzaDIuNjljLjEwMyAwIC4xODYtLjEwMi4xODYtLjIzdi0zLjI1YzAtLjA2OS4wMjUtLjEzNS4wNjktLjE3OGwyLjQyNC0yLjQwNmEuMTU4LjE1OCAwIDAxLjIwNS0uMDIzbDYuNDg0IDQuNzcyYTcuNjc3IDcuNjc3IDAgMDAzLjQ1MyAxLjI4M2MuMTA4LjAxMi4yLS4wOTUuMi0uMjN2LTMuMDZjMC0uMTE3LS4wNy0uMjEyLS4xNjQtLjIyN2E1LjAyOCA1LjAyOCAwIDAxLTIuMDI3LS44MDdsLTUuNjEzLTQuMDY0Yy0uMTE3LS4wNzgtLjEzMi0uMjc5LS4wMjgtLjM4MXoiIGZpbGw9IiNmZmYiPjwvcGF0aD48L3N2Zz4='
        };
    } else if (name.includes('glm') || name.includes('zhipu')) {
        return {
            letter: 'Z',
            bg: 'rgba(52, 133, 255, 0.15)',
            color: '#3485ff',
            img: 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjFlbSIgc3R5bGU9ImZsZXg6bm9uZTtsaW5lLWhlaWdodDoxIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxZW0iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRpdGxlPkNoYXRHTE08L3RpdGxlPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0ibG9iZS1pY29ucy1jaGF0LWdsbS1fUl8wXyIgeDE9Ii0xOC43NTYlIiB4Mj0iNzAuODk0JSIgeTE9IjQ5LjM3MSUiIHkyPSI5MC45NDQlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjNTA0QUY0Ij48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMzQ4NUZGIj48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHBhdGggZD0iTTkuOTE3IDJjNC45MDYgMCAxMC4xNzggMy45NDcgOC45MyAxMC41OC0uMDE0LjA3LS4wMzcuMTQtLjA1Ny4yMWwtLjAwMy0uMjc3Yy0uMDgzLTMtMS41MzQtOC45MzQtOC44Ny04LjkzNC0zLjM5MyAwLTguMTM3IDMuMDU0LTcuOTMgOC4xNTgtLjA0IDQuNzc4IDMuNTU1IDguNCA3Ljk1IDguMzMybC4wNzMtLjAwMWMxLjItLjAzMyAyLjc2My0uNDI5IDMuMS0xLjY1Ny4wNjMtLjAzMS4yNi41MzQuMjY4LjU5OC4wNDguMjU2LjExMi4zNjkuMTkyLjM0Ljk4MS0uMzQ4IDIuMjg2LTEuMjIyIDEuOTUyLTIuMzgtLjE3Ni0uNjEtMS43NzUtLjE0Ny0xLjkyMS0uMzQ3LjQxOC0uOTc5IDIuMjM0LS45MjYgMy4xNTMtLjcxNi40NDMuMTAyLjY1Ny4zOCAxLjAxMi40NDIuMjkuMDUyLjk4MS0uMi45Ni4yNDItMS41IDMuMDQyLTQuODkzIDUuNDEtOC44MDggNS40MUMzLjY1NCAyMiAwIDE2LjU3NCAwIDExLjczNyAwIDUuOTQ3IDQuOTU5IDIgOS45MTcgMnpNOS45IDUuM2MuNDg0IDAgMS4xMjUuMjI1IDEuMzguNTg1IDMuNjY5LjE0NSA0LjMxMyAyLjY4NiA0LjY5NCA1LjQ0NC4yNTUgMS44MzguMzE1IDIuMy4xODIgMS4zODdsLjA4My41OWMuMDY4LjQ0OC41NTQuNzM3Ljk4Mi41MTYuMTQ0LS4wNzUuMjU0LS4yMzEuMzI4LS40N2EuMi4yIDAgMDEuMjU4LS4xM2wuNjI1LjIyYS4yLjIgMCAwMS4xMjQuMjM4IDIuMTcyIDIuMTcyIDAgMDEtLjUxLjkyYy0uODc4LjkxNy0yLjc1Ny42NjQtMy4wOC0uNjItLjE0LS41NTQtLjA1NS0uNjI2LS4zNDUtMS4yNDItLjI5Mi0uNjIxLTEuMjM4LS43MDktMS42OS0uMjk1LS4zNDUuMzE1LS40MDcuODA1LS40MDYgMS4yODJMMTIuNiAxNS45YS45LjkgMCAwMS0uOS45aC0xLjRhLjkuOSAwIDAxLS45LS45di0uNjVhMS4xNSAxLjE1IDAgMTAtMi4zIDB2LjY1YS45LjkgMCAwMS0uOS45SDQuOGEuOS45IDAgMDEtLjktLjlsLjAzNS0zLjIzOWMuMDEyLTEuODg0LjM1Ni0zLjY1OCAyLjQ3LTQuMTM0LjItLjA0NS4yNTIuMTMuMjkuMzQyLjAyNS4xNTQuMDQzLjI1Mi4wNTMuMjk0LjcwMSAzLjA1OCAxLjc1IDQuMjk5IDMuMTQ0IDMuNzIybC42Ni0uMzMxLjI1NC0uMTNjLjE1OC0uMDgyLjI1LS4xMzEuMjc2LS4xNS4wMTItLjAxLS4xNjUtLjIwNi0uNDA3LS40NjRsLTEuMDEyLTEuMDY3YTguOTI1IDguOTI1IDAgMDEtLjE5OS0uMjE2Yy0uMDQ3LS4wMzQtLjExNi4wNjgtLjIwOC4zMDYtLjA3NC4xNTctLjI1MS4yNTItLjI3Mi4zMjYtLjAxMy4wNTguMTA4LjI5OC4zNjIuNzIuMTY0LjI4OC4yMi41MDgtLjMxLjM0My0xLjA0LS44LTEuNTE4LTIuMjczLTEuNjg0LTMuNzI1LS4wMDQtLjAzNS0uMTYyLTEuOTEzLS4xNjItMS45MTNhMS4yIDEuMiAwIDAxMS4xMTMtMS4yODFMOS45IDUuM3ptMTIuOTk0IDguNjhjLjAzNy42OTctLjQwMy43MDQtMS4yMTMuNTkxbC0xLjc4My0uMjc2Yy0uMjY1LS4wNTMtLjM4NS0uMDk5LS4zMTMtLjE0Ny40Ny0uMzE1IDMuMjY4LS45MyAzLjMxLS4xNjh6bS0uOTE1LS4wODNsLS45MjYuMDQyYy0uODUuMDc3LTEuNDUyLjI0LjMzOC4zMzZsLjEwMy4wMDNjLjgxNS4wMTIgMS4yNjQtLjM1OS40ODUtLjM4MXptMS42NjctMy42MDFoLjAxYy43OS4zOTguMDY3IDEuMDMtLjY1IDEuMzkzLS4xNC4wNy0uNDkxLjE3Ni0xLjA1Mi4zMTUtLjI0MS4wNC0uNDU3LjA5Mi0uMzMzLjE2bC4wMS4wMDVjMS45NTIuOTU4LTMuMTIzIDEuNTM0LTIuNDk1IDEuMjg1bC4zOC0uMTQ4Yy42OC0uMjY2IDEuNjE0LS42ODIgMS42NjYtMS4zMzcuMDM4LS40OCAxLjI1My0uNDQyIDEuNDkzLS45NjguMDQ4LS4xMDYgMC0uMjM2LS4xNDQtLjM4OS0uMDUtLjA0Ny0uMDk0LS4wOTQtLjEwNy0uMTQ4LS4wNzMtLjMwNS43LS40MzEgMS4yMjItLjE2OHptLTIuNTY4LS40NzRjLS4xMzUgMS4xOTgtMi40NzkgNC4xOTItMS45NDkgMi44NjNsLjAxNy0uMDQyYy4yOTgtLjcxNy4zNzYtMi4yMjEgMS4zMzctMy4yMjEuMjUtLjI2LjYzNi4wMzUuNTk1LjR6bS03Ljk3Ni0uMjUzYy4wMi0uNjk0IDEuMDAyLS45NjggMS4zNDYtLjM0Ny4wMS0xLjI3NC0xLjk0MS0uNzY4LTEuMzQ2LjM0N3oiIGZpbGw9InVybCgjbG9iZS1pY29ucy1jaGF0LWdsbS1fUl8wXykiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PC9wYXRoPjwvc3ZnPg=='
        };
    } else if (name.includes('qwen')) {
        return {
            letter: 'Q',
            bg: 'rgba(111, 105, 247, 0.15)',
            color: '#6f69f7',
            img: 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjFlbSIgc3R5bGU9ImZsZXg6bm9uZTtsaW5lLWhlaWdodDoxIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxZW0iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRpdGxlPlF3ZW48L3RpdGxlPjxwYXRoIGQ9Ik0xMi42MDQgMS4zNGMuMzkzLjY5Ljc4NCAxLjM4MiAxLjE3NCAyLjA3NWEuMTguMTggMCAwMC4xNTcuMDkxaDUuNTUyYy4xNzQgMCAuMzIyLjExLjQ0Ni4zMjdsMS40NTQgMi41N2MuMTkuMzM3LjI0LjQ3OC4wMjQuODM3LS4yNi40My0uNTEzLjg2NC0uNzYgMS4zbC0uMzY3LjY1OGMtLjEwNi4xOTYtLjIyMy4yOC0uMDQuNTEybDIuNjUyIDQuNjM3Yy4xNzIuMzAxLjExMS40OTQtLjA0My43Ny0uNDM3Ljc4NS0uODgyIDEuNTY0LTEuMzM1IDIuMzQtLjE1OS4yNzItLjM1Mi4zNzUtLjY4LjM3LS43NzctLjAxNi0xLjU1Mi0uMDEtMi4zMjcuMDE2YS4wOTkuMDk5IDAgMDAtLjA4MS4wNSA1NzUuMDk3IDU3NS4wOTcgMCAwMS0yLjcwNSA0Ljc0Yy0uMTY5LjI5My0uMzguMzYzLS43MjUuMzY0LS45OTcuMDAzLTIuMDAyLjAwNC0zLjAxNy4wMDJhLjUzNy41MzcgMCAwMS0uNDY1LS4yNzFsLTEuMzM1LTIuMzIzYS4wOS4wOSAwIDAwLS4wODMtLjA0OUg0Ljk4MmMtLjI4NS4wMy0uNTUzLS4wMDEtLjgwNS0uMDkybC0xLjYwMy0yLjc3YS41NDMuNTQzIDAgMDEtLjAwMi0uNTRsMS4yMDctMi4xMmEuMTk4LjE5OCAwIDAwMC0uMTk3IDU1MC45NTEgNTUwLjk1MSAwIDAxLTEuODc1LTMuMjcybC0uNzktMS4zOTVjLS4xNi0uMzEtLjE3My0uNDk2LjA5NS0uOTY1LjQ2NS0uODEzLjkyNy0xLjYyNSAxLjM4Ny0yLjQzNi4xMzItLjIzNC4zMDQtLjMzNC41ODQtLjMzNWEzMzguMyAzMzguMyAwIDAxMi41ODktLjAwMS4xMjQuMTI0IDAgMDAuMTA3LS4wNjNsMi44MDYtNC44OTVhLjQ4OC40ODggMCAwMS40MjItLjI0NmMuNTI0LS4wMDEgMS4wNTMgMCAxLjU4My0uMDA2TDExLjcwNCAxYy4zNDEtLjAwMy43MjQuMDMyLjkuMzR6bS0zLjQzMi40MDNhLjA2LjA2IDAgMDAtLjA1Mi4wM0w2LjI1NCA2Ljc4OGEuMTU3LjE1NyAwIDAxLS4xMzUuMDc4SDMuMjUzYy0uMDU2IDAtLjA3LjAyNS0uMDQxLjA3NGw1LjgxIDEwLjE1NmMuMDI1LjA0Mi4wMTMuMDYyLS4wMzQuMDYzbC0yLjc5NS4wMTVhLjIxOC4yMTggMCAwMC0uMi4xMTZsLTEuMzIgMi4zMWMtLjA0NC4wNzgtLjAyMS4xMTguMDY4LjExOGw1LjcxNi4wMDhjLjA0NiAwIC4wOC4wMi4xMDQuMDYxbDEuNDAzIDIuNDU0Yy4wNDYuMDgxLjA5Mi4wODIuMTM5IDBsNS4wMDYtOC43Ni43ODMtMS4zODJhLjA1NS4wNTUgMCAwMS4wOTYgMGwxLjQyNCAyLjUzYS4xMjIuMTIyIDAgMDAuMTA3LjA2MmwyLjc2My0uMDJhLjA0LjA0IDAgMDAuMDM1LS4wMi4wNDEuMDQxIDAgMDAwLS4wNGwtMi45LTUuMDg2YS4xMDguMTA4IDAgMDEwLS4xMTNsLjI5My0uNTA3IDEuMTItMS45NzdjLjAyNC0uMDQxLjAxMi0uMDYyLS4wMzUtLjA2Mkg5LjJjLS4wNTkgMC0uMDczLS4wMjYtLjA0My0uMDc3bDEuNDM0LTIuNTA1YS4xMDcuMTA3IDAgMDAwLS4xMTRMOS4yMjUgMS43NzRhLjA2LjA2IDAgMDAtLjA1My0uMDMxem02LjI5IDguMDJjLjA0NiAwIC4wNTguMDIuMDM0LjA2bC0uODMyIDEuNDY1LTIuNjEzIDQuNTg1YS4wNTYuMDU2IDAgMDEtLjA1LjAyOS4wNTguMDU4IDAgMDEtLjA1LS4wMjlMOC40OTggOS44NDFjLS4wMi0uMDM0LS4wMS0uMDUyLjAyOC0uMDU0bC4yMTYtLjAxMiA2LjcyMi0uMDEyeiIgZmlsbD0idXJsKCNsb2JlLWljb25zLXF3ZW4tX1JfMF8pIiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImxvYmUtaWNvbnMtcXdlbi1fUl8wXyIgeDE9IjAlIiB4Mj0iMTAwJSIgeTE9IjAlIiB5Mj0iMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM2MzM2RTciIHN0b3Atb3BhY2l0eT0iLjg0Ij48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjNkY2OUY3IiBzdG9wLW9wYWNpdHk9Ii44NCI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjwvc3ZnPg=='
        };
    } else if (name.includes('muse')) {
        return {
            letter: 'M',
            bg: 'rgba(0, 130, 251, 0.15)',
            color: '#0082fb',
            img: 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjFlbSIgc3R5bGU9ImZsZXg6bm9uZTtsaW5lLWhlaWdodDoxIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxZW0iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRpdGxlPk1ldGE8L3RpdGxlPjxwYXRoIGQ9Ik02Ljg5NyA0aC0uMDI0bC0uMDMxIDIuNjE1aC4wMjJjMS43MTUgMCAzLjA0NiAxLjM1NyA1Ljk0IDYuMjQ2bC4xNzUuMjk3LjAxMi4wMiAxLjYyLTIuNDM4LS4wMTItLjAxOWE0OC43NjMgNDguNzYzIDAgMDAtMS4wOTgtMS43MTYgMjguMDEgMjguMDEgMCAwMC0xLjE3NS0xLjYyOUMxMC40MTMgNC45MzIgOC44MTIgNCA2Ljg5NiA0eiIgZmlsbD0idXJsKCNsb2JlLWljb25zLW1ldGEtMC1fUl8wXykiPjwvcGF0aD48cGF0aCBkPSJNNi44NzMgNEM0Ljk1IDQuMDEgMy4yNDcgNS4yNTggMi4wMiA3LjE3YTQuMzUyIDQuMzUyIDAgMDAtLjAxLjAxN2wyLjI1NCAxLjIzMS4wMTEtLjAxN2MuNzE4LTEuMDgzIDEuNjEtMS43NzQgMi41NjgtMS43ODVoLjAyMUw2Ljg5NiA0aC0uMDIzeiIgZmlsbD0idXJsKCNsb2JlLWljb25zLW1ldGEtMS1fUl8wXykiPjwvcGF0aD48cGF0aCBkPSJNMi4wMTkgNy4xN2wtLjAxMS4wMTdDMS4yIDguNDQ3LjU5OCA5Ljk5NS4yNzQgMTEuNjY0bC0uMDA1LjAyMiAyLjUzNC42LjAwNC0uMDIyYy4yNy0xLjQ2Ny43ODYtMi44MjggMS40NTYtMy44NDVsLjAxMS0uMDE3TDIuMDIgNy4xN3oiIGZpbGw9InVybCgjbG9iZS1pY29ucy1tZXRhLTItX1JfMF8pIj48L3BhdGg+PHBhdGggZD0iTTIuODA3IDEyLjI2NGwtMi41MzMtLjYtLjAwNS4wMjJjLS4xNzcuOTE4LS4yNjcgMS44NTEtLjI2OSAyLjc4NnYuMDIzbDIuNTk4LjIzM3YtLjAyM2ExMi41OTEgMTIuNTkxIDAgMDEuMjEtMi40NHoiIGZpbGw9InVybCgjbG9iZS1pY29ucy1tZXRhLTMtX1JfMF8pIj48L3BhdGg+PHBhdGggZD0iTTIuNjc3IDE1LjUzN2E1LjQ2MiA1LjQ2MiAwIDAxLS4wNzktLjgxM3YtLjAyMkwwIDE0LjQ2OHYuMDI0YTguODkgOC44OSAwIDAwLjE0NiAxLjY1MmwyLjUzNS0uNTg1YTQuMTA2IDQuMTA2IDAgMDEtLjAwNC0uMDIyeiIgZmlsbD0idXJsKCNsb2JlLWljb25zLW1ldGEtNC1fUl8wXykiPjwvcGF0aD48cGF0aCBkPSJNMy4yNyAxNi44OWMtLjI4NC0uMzEtLjQ4NC0uNzU2LS41ODktMS4zMjhsLS4wMDQtLjAyMS0yLjUzNS41ODUuMDA0LjAyMWMuMTkyIDEuMDEuNTY4IDEuODUgMS4xMDYgMi40ODdsLjAxNC4wMTcgMi4wMTgtMS43NDVhMi4xMDYgMi4xMDYgMCAwMS0uMDE1LS4wMTZ6IiBmaWxsPSJ1cmwoI2xvYmUtaWNvbnMtbWV0YS01LV9SXzBfKSI+PC9wYXRoPjxwYXRoIGQ9Ik0xMC43OCA5LjY1NGMtMS41MjggMi4zNS0yLjQ1NCAzLjgyNS0yLjQ1NCAzLjgyNS0yLjAzNSAzLjItMi43MzkgMy45MTctMy44NzEgMy45MTdhMS41NDUgMS41NDUgMCAwMS0xLjE4Ni0uNTA4bC0yLjAxNyAxLjc0NC4wMTQuMDE3QzIuMDEgMTkuNTE4IDMuMDU4IDIwIDQuMzU2IDIwYzEuOTYzIDAgMy4zNzQtLjkyOCA1Ljg4NC01LjMzbDEuNzY2LTMuMTNhNDEuMjgzIDQxLjI4MyAwIDAwLTEuMjI3LTEuODg2eiIgZmlsbD0iIzAwODJGQiI+PC9wYXRoPjxwYXRoIGQ9Ik0xMy41MDIgNS45NDZsLS4wMTYuMDE2Yy0uNC40My0uNzg2LjkwOC0xLjE2IDEuNDE2LjM3OC40ODMuNzY4IDEuMDI0IDEuMTc1IDEuNjMuNDgtLjc0My45MjgtMS4zNDUgMS4zNjctMS44MDdsLjAxNi0uMDE2LTEuMzgyLTEuMjR6IiBmaWxsPSJ1cmwoI2xvYmUtaWNvbnMtbWV0YS02LV9SXzBfKSI+PC9wYXRoPjxwYXRoIGQ9Ik0yMC45MTggNS43MTNDMTkuODUzIDQuNjMzIDE4LjU4MyA0IDE3LjIyNSA0Yy0xLjQzMiAwLTIuNjM3Ljc4Ny0zLjcyMyAxLjk0NGwtLjAxNi4wMTYgMS4zODIgMS4yNC4wMTYtLjAxN2MuNzE1LS43NDcgMS40MDgtMS4xMiAyLjE3Ni0xLjEyLjgyNiAwIDEuNi4zOSAyLjI3IDEuMDc1bC4wMTUuMDE2IDEuNTg5LTEuNDI1LS4wMTYtLjAxNnoiIGZpbGw9IiMwMDgyRkIiPjwvcGF0aD48cGF0aCBkPSJNMjMuOTk4IDE0LjEyNWMtLjA2LTMuNDY3LTEuMjctNi41NjYtMy4wNjQtOC4zOTZsLS4wMTYtLjAxNi0xLjU4OCAxLjQyNC4wMTUuMDE2YzEuMzUgMS4zOTIgMi4yNzcgMy45OCAyLjM2MSA2Ljk3MXYuMDIzaDIuMjkydi0uMDIyeiIgZmlsbD0idXJsKCNsb2JlLWljb25zLW1ldGEtNy1fUl8wXykiPjwvcGF0aD48cGF0aCBkPSJNMjMuOTk4IDE0LjE1di0uMDIzaC0yLjI5MnYuMDIyYy4wMDQuMTQuMDA2LjI4Mi4wMDYuNDI0IDAgLjgxNS0uMTIxIDEuNDc0LS4zNjggMS45NWwtLjAxMS4wMjIgMS43MDggMS43ODIuMDEzLS4wMmMuNjItLjk2Ljk0Ni0yLjI5My45NDYtMy45MSAwLS4wODMgMC0uMTY1LS4wMDItLjI0N3oiIGZpbGw9InVybCgjbG9iZS1pY29ucy1tZXRhLTgtX1JfMF8pIj48L3BhdGg+PHBhdGggZD0iTTIxLjM0NCAxNi41MmwtLjAxMS4wMmMtLjIxNC40MDItLjUxOS42Ny0uOTE3Ljc4N2wuNzc4IDIuNDYyYTMuNDkzIDMuNDkzIDAgMDAuNDM4LS4xODIgMy41NTggMy41NTggMCAwMDEuMzY2LTEuMjE4bC4wNDQtLjA2NS4wMTItLjAyLTEuNzEtMS43ODR6IiBmaWxsPSJ1cmwoI2xvYmUtaWNvbnMtbWV0YS05LV9SXzBfKSI+PC9wYXRoPjxwYXRoIGQ9Ik0xOS45MiAxNy4zOTNjLS4yNjIgMC0uNDkyLS4wMzktLjcxOC0uMTRsLS43OTggMi41MjJjLjQ0OS4xNTMuOTI3LjIyMiAxLjQ2LjIyMi40OTIgMCAuOTQzLS4wNzMgMS4zNTItLjIxNWwtLjc4LTIuNDYyYy0uMTY3LjA1LS4zNDEuMDc1LS41MTcuMDczeiIgZmlsbD0idXJsKCNsb2JlLWljb25zLW1ldGEtMTAtX1JfMF8pIj48L3BhdGg+PHBhdGggZD0iTTE4LjMyMyAxNi41MzRsLS4wMTQtLjAxNy0xLjgzNiAxLjkxNC4wMTYuMDE3Yy42MzcuNjgyIDEuMjQ2IDEuMTA1IDEuOTM3IDEuMzM3bC43OTctMi41MmMtLjI5MS0uMTI1LS41NzMtLjM1My0uOS0uNzMxeiIgZmlsbD0idXJsKCNsb2JlLWljb25zLW1ldGEtMTEtX1JfMF8pIj48L3BhdGg+PHBhdGggZD0iTTE4LjMwOSAxNi41MTVjLS41NS0uNjQyLTEuMjMyLTEuNzEyLTIuMzAzLTMuNDRsLTEuMzk2LTIuMzM2LS4wMTEtLjAyLTEuNjIgMi40MzguMDEyLjAyLjk4OSAxLjY2OGMuOTU5IDEuNjEgMS43NCAyLjc3NCAyLjQ5MyAzLjU4NWwuMDE2LjAxNiAxLjgzNC0xLjkxNGEyLjM1MyAyLjM1MyAwIDAxLS4wMTQtLjAxN3oiIGZpbGw9InVybCgjbG9iZS1pY29ucy1tZXRhLTEyLV9SXzBfKSI+PC9wYXRoPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0ibG9iZS1pY29ucy1tZXRhLTAtX1JfMF8iIHgxPSI3NS44OTclIiB4Mj0iMjYuMzEyJSIgeTE9Ijg5LjE5OSUiIHkyPSIxMi4xOTQlIj48c3RvcCBvZmZzZXQ9Ii4wNiUiIHN0b3AtY29sb3I9IiMwODY3REYiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjQ1LjM5JSIgc3RvcC1jb2xvcj0iIzA2NjhFMSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iODUuOTElIiBzdG9wLWNvbG9yPSIjMDA2NEUwIj48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImxvYmUtaWNvbnMtbWV0YS0xLV9SXzBfIiB4MT0iMjEuNjclIiB4Mj0iOTcuMDY4JSIgeTE9Ijc1Ljg3NCUiIHkyPSIyMy45ODUlIj48c3RvcCBvZmZzZXQ9IjEzLjIzJSIgc3RvcC1jb2xvcj0iIzAwNjRERiI+PC9zdG9wPjxzdG9wIG9mZnNldD0iOTkuODglIiBzdG9wLWNvbG9yPSIjMDA2NEUwIj48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImxvYmUtaWNvbnMtbWV0YS0yLV9SXzBfIiB4MT0iMzguMjYzJSIgeDI9IjYwLjg5NSUiIHkxPSI4OS4xMjclIiB5Mj0iMTYuMTMxJSI+PHN0b3Agb2Zmc2V0PSIxLjQ3JSIgc3RvcC1jb2xvcj0iIzAwNzJFQyI+PC9zdG9wPjxzdG9wIG9mZnNldD0iNjguODElIiBzdG9wLWNvbG9yPSIjMDA2NERGIj48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImxvYmUtaWNvbnMtbWV0YS0zLV9SXzBfIiB4MT0iNDcuMDMyJSIgeDI9IjUyLjE1JSIgeTE9IjkwLjE5JSIgeTI9IjE1Ljc0NSUiPjxzdG9wIG9mZnNldD0iNy4zMSUiIHN0b3AtY29sb3I9IiMwMDdDRjYiPjwvc3RvcD48c3RvcCBvZmZzZXQ9Ijk5LjQzJSIgc3RvcC1jb2xvcj0iIzAwNzJFQyI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJsb2JlLWljb25zLW1ldGEtNC1fUl8wXyIgeDE9IjUyLjE1NSUiIHgyPSI0Ny41OTElIiB5MT0iNTguMzAxJSIgeTI9IjM3LjAwNCUiPjxzdG9wIG9mZnNldD0iNy4zMSUiIHN0b3AtY29sb3I9IiMwMDdGRjkiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwMDdDRjYiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0ibG9iZS1pY29ucy1tZXRhLTUtX1JfMF8iIHgxPSIzNy42ODklIiB4Mj0iNjEuOTYxJSIgeTE9IjEyLjUwMiUiIHkyPSI2My42MjQlIj48c3RvcCBvZmZzZXQ9IjcuMzElIiBzdG9wLWNvbG9yPSIjMDA3RkY5Ij48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMDA4MkZCIj48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImxvYmUtaWNvbnMtbWV0YS02LV9SXzBfIiB4MT0iMzQuODA4JSIgeDI9IjYyLjMxMyUiIHkxPSI2OC44NTklIiB5Mj0iMjMuMTc0JSI+PHN0b3Agb2Zmc2V0PSIyNy45OSUiIHN0b3AtY29sb3I9IiMwMDdGRjgiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjkxLjQxJSIgc3RvcC1jb2xvcj0iIzAwODJGQiI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJsb2JlLWljb25zLW1ldGEtNy1fUl8wXyIgeDE9IjQzLjc2MiUiIHgyPSI1Ny42MDIlIiB5MT0iNi4yMzUlIiB5Mj0iOTguNTE0JSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzAwODJGQiI+PC9zdG9wPjxzdG9wIG9mZnNldD0iOTkuOTUlIiBzdG9wLWNvbG9yPSIjMDA4MUZBIj48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImxvYmUtaWNvbnMtbWV0YS04LV9SXzBfIiB4MT0iNjAuMDU1JSIgeDI9IjM5Ljg4JSIgeTE9IjQuNjYxJSIgeTI9IjY5LjA3NyUiPjxzdG9wIG9mZnNldD0iNi4xOSUiIHN0b3AtY29sb3I9IiMwMDgxRkEiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwMDgwRjkiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0ibG9iZS1pY29ucy1tZXRhLTktX1JfMF8iIHgxPSIzMC4yODIlIiB4Mj0iNjEuMDgxJSIgeTE9IjU5LjMyJSIgeTI9IjMzLjI0NCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwMjdBRjMiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwMDgwRjkiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0ibG9iZS1pY29ucy1tZXRhLTEwLV9SXzBfIiB4MT0iMjAuNDMzJSIgeDI9IjgyLjExMiUiIHkxPSI1MC4wMDElIiB5Mj0iNTAuMDAxJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzAzNzdFRiI+PC9zdG9wPjxzdG9wIG9mZnNldD0iOTkuOTQlIiBzdG9wLWNvbG9yPSIjMDI3OUYxIj48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImxvYmUtaWNvbnMtbWV0YS0xMS1fUl8wXyIgeDE9IjQwLjMwMyUiIHgyPSI3Mi4zOTQlIiB5MT0iMzUuMjk4JSIgeTI9IjU3LjgxMSUiPjxzdG9wIG9mZnNldD0iLjE5JSIgc3RvcC1jb2xvcj0iIzA0NzFFOSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzAzNzdFRiI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJsb2JlLWljb25zLW1ldGEtMTItX1JfMF8iIHgxPSIzMi4yNTQlIiB4Mj0iNjguMDAzJSIgeTE9IjE5LjcxOSUiIHkyPSI4NC45MDglIj48c3RvcCBvZmZzZXQ9IjI3LjY1JSIgc3RvcC1jb2xvcj0iIzA4NjdERiI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzA0NzFFOSI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjwvc3ZnPg=='
        };
    }
    return {
        letter: modelName.charAt(0),
        bg: 'linear-gradient(135deg, #ff2e93, #7e22ce)',
        color: '#ffffff',
        img: null
    };
}

// Global state
let currentSort = 'rank';
let currentFilter = 'all';
let searchQuery = '';

// DOM Elements
const leaderboardContainer = document.getElementById('leaderboard-container');
const sortButtons = document.querySelectorAll('.sort-btn');
const filterPills = document.querySelectorAll('.filter-pills .filter-pill');
const searchInput = document.getElementById('model-search-input');
const clearSearchBtn = document.getElementById('clear-search-btn');
const noResultsCard = document.getElementById('no-results-card');
const resetFilterBtn = document.getElementById('reset-filter-btn');
const modelModalBackdrop = document.getElementById('model-modal-backdrop');
const modalContent = document.getElementById('modal-content');
const modalCloseBtn = document.getElementById('modal-close-btn');
const copyHarnessBtn = document.getElementById('copy-harness-btn');
const toggleExpandBtn = document.getElementById('toggle-expand-btn');
const exportHarnessBtn = document.getElementById('export-harness-btn');
const harnessBody = document.getElementById('harness-body');
const harnessFade = document.getElementById('harness-fade');
const backToTopBtn = document.getElementById('back-to-top-btn');
const modelCountBadge = document.getElementById('model-count-badge');
const exportMarkdownBtn = document.getElementById('export-markdown-btn');
const shareLinkBtn = document.getElementById('share-link-btn');

// Matchup DOM Elements
const matchupSelectA = document.getElementById('matchup-model-a');
const matchupSelectB = document.getElementById('matchup-model-b');
const matchupResultsContainer = document.getElementById('matchup-results-container');
const randomMatchupBtn = document.getElementById('random-matchup-btn');

// Animate numbers for methodology stat-boxes
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const duration = 1200;
        const stepTime = 20;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, stepTime);
    });
}

// Render Leaderboard Model Cards
function renderLeaderboard() {
    let filtered = modelsData.filter(model => {
        const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              model.desc.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (!matchesSearch) return false;

        if (currentFilter === 'top-logic') return model.logic >= 400;
        if (currentFilter === 'top-prose') return model.prose >= 400;
        if (currentFilter === 'top-flex') return model.flexibility >= 400;
        if (currentFilter === 'top-knowledge') return model.knowledge >= 400;

        return true;
    });

    // Sorting
    filtered.sort((a, b) => {
        if (currentSort === 'rank') return a.rank - b.rank;
        if (currentSort === 'logic') return b.logic - a.logic;
        if (currentSort === 'prose') return b.prose - a.prose;
        if (currentSort === 'flexibility') return b.flexibility - a.flexibility;
        if (currentSort === 'knowledge') return b.knowledge - a.knowledge;
        return 0;
    });

    leaderboardContainer.innerHTML = '';

    if (filtered.length === 0) {
        noResultsCard.style.display = 'block';
    } else {
        noResultsCard.style.display = 'none';
        
        filtered.forEach(model => {
            const card = document.createElement('div');
            card.className = 'model-card glass-card';
            card.id = `model-card-${model.rank}`;

            let rankClass = '';
            let medalText = '';
            if (model.rank === 1) { rankClass = 'rank-top-1'; medalText = 'Gold'; }
            else if (model.rank === 2) { rankClass = 'rank-top-2'; medalText = 'Silver'; }
            else if (model.rank === 3) { rankClass = 'rank-top-3'; medalText = 'Bronze'; }

            // Check if model has a quirk callout
            let quirkTagHTML = '';
            if (model.name.includes('ChatGPT')) {
                quirkTagHTML = `<a href="#quirk-chatgpt" class="card-quirk-tag danger" onclick="event.stopPropagation();">⚠ 92% Hallucination</a>`;
            } else if (model.name.includes('Gemini 3.1 Pro')) {
                quirkTagHTML = `<a href="#quirk-gemini" class="card-quirk-tag" onclick="event.stopPropagation();">✦ Instruction Quirk</a>`;
            } else if (model.name.includes('Kimi')) {
                quirkTagHTML = `<a href="#quirk-kimi" class="card-quirk-tag" onclick="event.stopPropagation();">⏱ CoT Tax</a>`;
            } else if (model.name.includes('Opus 5')) {
                quirkTagHTML = `<a href="#quirk-opus" class="card-quirk-tag" onclick="event.stopPropagation();">📉 Logic Regression</a>`;
            }

            const brand = getBrandLogoInfo(model.name);
            const logoHTML = brand.img 
                ? `<div class="card-brand-logo" style="background: ${brand.bg};"><img src="${brand.img}" alt="${model.name} logo" class="brand-logo-img" onerror="this.style.display='none'; this.parentElement.innerHTML='${brand.letter}'"></div>`
                : `<div class="card-brand-logo" style="background: ${brand.bg};"><span class="brand-logo-letter">${brand.letter}</span></div>`;

            card.innerHTML = `
                <div class="model-rank-wrapper">
                    <div class="model-rank ${rankClass}">#${model.rank}</div>
                    ${medalText ? `<span class="rank-medal">${medalText}</span>` : ''}
                </div>
                <div class="model-info">
                    <div class="model-header-line">
                        ${logoHTML}
                        <h3>${model.name}</h3>
                        <span class="context-tag">${model.context} Context</span>
                        ${quirkTagHTML}
                    </div>
                    <p class="model-desc">${model.desc}</p>
                </div>
                <div class="model-metrics">
                    <div class="metric" title="Logic Score: ${model.logic}">
                        <span class="metric-val" style="color: #c084fc;">${model.logic}</span>
                        <span class="metric-label">Logic</span>
                    </div>
                    <div class="metric" title="Prose Score: ${model.prose}">
                        <span class="metric-val" style="color: #ff2e93;">${model.prose}</span>
                        <span class="metric-label">Prose</span>
                    </div>
                    <div class="metric" title="Flexibility Score: ${model.flexibility}">
                        <span class="metric-val" style="color: #38bdf8;">${model.flexibility}</span>
                        <span class="metric-label">Flex</span>
                    </div>
                    <div class="metric" title="Knowledge Score: ${model.knowledge}">
                        <span class="metric-val" style="color: #34d399;">${model.knowledge}</span>
                        <span class="metric-label">Know</span>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => openModelModal(model));
            leaderboardContainer.appendChild(card);
        });
    }

    if (modelCountBadge) {
        modelCountBadge.textContent = `${filtered.length} Models Shown`;
    }
}

// Render Artificial Analysis Style Vertical Column Charts
function renderComparativeCharts() {
    const logicContainer = document.getElementById('logic-chart-container');
    const proseContainer = document.getElementById('prose-chart-container');
    const flexContainer = document.getElementById('flex-chart-container');
    const knowledgeContainer = document.getElementById('knowledge-chart-container');

    if (!logicContainer || !proseContainer || !flexContainer) return;

    // Highest points in dataset for proper scaling
    const maxLogic = Math.max(...modelsData.map(m => m.logic));
    const maxProse = Math.max(...modelsData.map(m => m.prose));
    const maxFlex = Math.max(...modelsData.map(m => m.flexibility));
    const maxKnowledge = Math.max(...modelsData.map(m => m.knowledge));

    // 1. Logic Chart
    const sortedByLogic = [...modelsData].sort((a, b) => b.logic - a.logic);
    logicContainer.innerHTML = buildChartHTML(sortedByLogic, 'logic', maxLogic, '#a855f7', 'linear-gradient(180deg, #c084fc, #7e22ce)');

    // 2. Prose Chart
    const sortedByProse = [...modelsData].sort((a, b) => b.prose - a.prose);
    proseContainer.innerHTML = buildChartHTML(sortedByProse, 'prose', maxProse, '#ff2e93', 'linear-gradient(180deg, #ff66b2, #ff2e93)');

    // 3. Flexibility Chart
    const sortedByFlex = [...modelsData].sort((a, b) => b.flexibility - a.flexibility);
    flexContainer.innerHTML = buildChartHTML(sortedByFlex, 'flexibility', maxFlex, '#06b6d4', 'linear-gradient(180deg, #38bdf8, #0284c7)');

    // 4. Knowledge Chart
    if (knowledgeContainer) {
        const sortedByKnowledge = [...modelsData].sort((a, b) => b.knowledge - a.knowledge);
        knowledgeContainer.innerHTML = buildChartHTML(sortedByKnowledge, 'knowledge', maxKnowledge, '#10b981', 'linear-gradient(180deg, #34d399, #059669)');
    }

    // Attach click listeners on rows to open model popup
    document.querySelectorAll('.h-bar-row').forEach(row => {
        row.addEventListener('click', () => {
            const rank = parseInt(row.getAttribute('data-rank'));
            const model = modelsData.find(m => m.rank === rank);
            if (model) openModelModal(model);
        });
    });
}

// Helper to construct Side-by-Side Horizontal Bar Chart (Clean, No-Rotated Text)
function buildChartHTML(dataList, metricKey, maxValue, themeColor, gradientBg) {
    const baseValue = BASES[metricKey];

    return `
        <div class="horizontal-bars-list">
            ${dataList.map((model, idx) => {
                const val = model[metricKey];
                const widthPct = Math.max(12, Math.round((val / maxValue) * 100));
                const multiplier = (val / baseValue).toFixed(1);
                const brand = getBrandLogoInfo(model.name);

                const iconHTML = brand.img
                    ? `<img src="${brand.img}" alt="${model.name}" class="brand-logo-img" onerror="this.style.display='none'; this.parentElement.innerHTML='${brand.letter}'">`
                    : `<span class="brand-logo-letter">${brand.letter}</span>`;

                return `
                    <div class="h-bar-row" data-rank="${model.rank}" title="${model.name}: ${val} pts">
                        <span class="h-bar-rank">#${idx + 1}</span>
                        <div class="h-bar-brand-icon" style="background: ${brand.bg};">
                            ${iconHTML}
                        </div>
                        <span class="h-bar-name" title="${model.name}">${model.name}</span>
                        <div class="h-bar-track">
                            <div class="h-bar-fill" style="width: ${widthPct}%; background: ${gradientBg};"></div>
                        </div>
                        <span class="h-bar-val" style="color: ${themeColor};">${val}</span>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// Populate Matchup Select Dropdowns
function initMatchupDropdowns() {
    if (!matchupSelectA || !matchupSelectB) return;

    matchupSelectA.innerHTML = '';
    matchupSelectB.innerHTML = '';

    modelsData.forEach(model => {
        const optA = document.createElement('option');
        optA.value = model.rank;
        optA.textContent = `#${model.rank} ${model.name}`;
        matchupSelectA.appendChild(optA);

        const optB = document.createElement('option');
        optB.value = model.rank;
        optB.textContent = `#${model.rank} ${model.name}`;
        matchupSelectB.appendChild(optB);
    });

    // Default Selection: Gemini 3.1 Pro (#1) vs Kimi k3 (#2)
    matchupSelectA.value = "1";
    matchupSelectB.value = "2";

    matchupSelectA.addEventListener('change', renderMatchupComparison);
    matchupSelectB.addEventListener('change', renderMatchupComparison);

    if (randomMatchupBtn) {
        randomMatchupBtn.addEventListener('click', triggerRouletteMatchup);
    }

    renderMatchupComparison();
}

// High-Energy Roulette Random Matchup Generator
function triggerRouletteMatchup() {
    if (randomMatchupBtn.classList.contains('charging')) return;

    randomMatchupBtn.classList.add('charging');
    matchupResultsContainer.classList.add('shuffling');

    let counter = 0;
    const maxRolls = 14;
    const rollInterval = 60;

    const interval = setInterval(() => {
        const randA = Math.floor(Math.random() * modelsData.length);
        let randB = Math.floor(Math.random() * modelsData.length);
        while (randB === randA) {
            randB = Math.floor(Math.random() * modelsData.length);
        }

        matchupSelectA.value = modelsData[randA].rank;
        matchupSelectB.value = modelsData[randB].rank;
        renderMatchupComparison();

        counter++;
        if (counter >= maxRolls) {
            clearInterval(interval);
            randomMatchupBtn.classList.remove('charging');
            matchupResultsContainer.classList.remove('shuffling');
            matchupResultsContainer.classList.add('locked-in');
            setTimeout(() => {
                matchupResultsContainer.classList.remove('locked-in');
            }, 600);
        }
    }, rollInterval);
}

// Render Head-to-Head Comparison Results
function renderMatchupComparison() {
    if (!matchupResultsContainer) return;

    const rankA = parseInt(matchupSelectA.value);
    const rankB = parseInt(matchupSelectB.value);

    const modelA = modelsData.find(m => m.rank === rankA) || modelsData[0];
    const modelB = modelsData.find(m => m.rank === rankB) || modelsData[1];

    // Compute Deltas
    const logicDiff = modelA.logic - modelB.logic;
    const proseDiff = modelA.prose - modelB.prose;
    const flexDiff = modelA.flexibility - modelB.flexibility;
    const knowledgeDiff = modelA.knowledge - modelB.knowledge;

    const brandA = getBrandLogoInfo(modelA.name);
    const brandB = getBrandLogoInfo(modelB.name);

    const logoA = brandA.img
        ? `<div class="card-brand-logo" style="background: ${brandA.bg};"><img src="${brandA.img}" alt="${modelA.name}" class="brand-logo-img"></div>`
        : `<div class="card-brand-logo" style="background: ${brandA.bg};"><span class="brand-logo-letter">${brandA.letter}</span></div>`;

    const logoB = brandB.img
        ? `<div class="card-brand-logo" style="background: ${brandB.bg};"><img src="${brandB.img}" alt="${modelB.name}" class="brand-logo-img"></div>`
        : `<div class="card-brand-logo" style="background: ${brandB.bg};"><span class="brand-logo-letter">${brandB.letter}</span></div>`;

    // Maximums for meter fills
    const maxLogic = Math.max(500, ...modelsData.map(m => m.logic));
    const maxProse = Math.max(500, ...modelsData.map(m => m.prose));
    const maxFlex = Math.max(500, ...modelsData.map(m => m.flexibility));
    const maxKnowledge = Math.max(500, ...modelsData.map(m => m.knowledge));

    const deltaLogicHTML = formatDeltaBox('Logic Delta', logicDiff, modelA.name, modelB.name);
    const deltaProseHTML = formatDeltaBox('Prose Delta', proseDiff, modelA.name, modelB.name);
    const deltaFlexHTML = formatDeltaBox('Flexibility Delta', flexDiff, modelA.name, modelB.name);
    const deltaKnowledgeHTML = formatDeltaBox('Knowledge Delta', knowledgeDiff, modelA.name, modelB.name);

    // Qualitative Takeaway
    let takeawayText = "";
    if (modelA.rank === modelB.rank) {
        takeawayText = `Same model selected. Choose two distinct models to evaluate architectural divergence.`;
    } else {
        const advantagesA = [];
        const advantagesB = [];

        if (modelA.logic > modelB.logic) advantagesA.push(`Superior causal logic (+${logicDiff} pts)`);
        else if (modelB.logic > modelA.logic) advantagesB.push(`Superior causal logic (+${Math.abs(logicDiff)} pts)`);

        if (modelA.prose > modelB.prose) advantagesA.push(`Richer prose flow (+${proseDiff} pts)`);
        else if (modelB.prose > modelA.prose) advantagesB.push(`Richer prose flow (+${Math.abs(proseDiff)} pts)`);

        if (modelA.flexibility > modelB.flexibility) advantagesA.push(`Broader thematic versatility (+${flexDiff} pts)`);
        else if (modelB.flexibility > modelA.flexibility) advantagesB.push(`Broader thematic versatility (+${Math.abs(flexDiff)} pts)`);

        if (modelA.knowledge > modelB.knowledge) advantagesA.push(`Deeper canon knowledge (+${knowledgeDiff} pts)`);
        else if (modelB.knowledge > modelA.knowledge) advantagesB.push(`Deeper canon knowledge (+${Math.abs(knowledgeDiff)} pts)`);

        takeawayText = `<strong>${modelA.name}</strong> (${advantagesA.length > 0 ? advantagesA.join(', ') : 'No primary score edge'}) vs <strong>${modelB.name}</strong> (${advantagesB.length > 0 ? advantagesB.join(', ') : 'No primary score edge'}).`;
    }

    matchupResultsContainer.innerHTML = `
        <div class="matchup-cards-row">
            <!-- Model A Box -->
            <div class="matchup-model-box">
                <div class="matchup-model-header">
                    <div class="model-title-with-logo">
                        ${logoA}
                        <div>
                            <div class="matchup-model-title">${modelA.name}</div>
                            <span class="context-tag">Rank #${modelA.rank} • ${modelA.context}</span>
                        </div>
                    </div>
                </div>
                <div class="matchup-metric-bars">
                    <div class="matchup-metric-item">
                        <div class="matchup-metric-labels">
                            <span class="matchup-metric-name">Logic & Reasoning</span>
                            <span class="matchup-metric-score" style="color: #c084fc;">${modelA.logic} pts</span>
                        </div>
                        <div class="matchup-meter">
                            <div class="matchup-meter-fill" style="width: ${(modelA.logic / maxLogic) * 100}%; background: linear-gradient(90deg, #c084fc, #7e22ce);"></div>
                        </div>
                    </div>
                    <div class="matchup-metric-item">
                        <div class="matchup-metric-labels">
                            <span class="matchup-metric-name">Prose & Tone Quality</span>
                            <span class="matchup-metric-score" style="color: #ff2e93;">${modelA.prose} pts</span>
                        </div>
                        <div class="matchup-meter">
                            <div class="matchup-meter-fill" style="width: ${(modelA.prose / maxProse) * 100}%; background: linear-gradient(90deg, #ff66b2, #ff2e93);"></div>
                        </div>
                    </div>
                    <div class="matchup-metric-item">
                        <div class="matchup-metric-labels">
                            <span class="matchup-metric-name">Content Flexibility</span>
                            <span class="matchup-metric-score" style="color: #38bdf8;">${modelA.flexibility} pts</span>
                        </div>
                        <div class="matchup-meter">
                            <div class="matchup-meter-fill" style="width: ${(modelA.flexibility / maxFlex) * 100}%; background: linear-gradient(90deg, #38bdf8, #0284c7);"></div>
                        </div>
                    </div>
                    <div class="matchup-metric-item">
                        <div class="matchup-metric-labels">
                            <span class="matchup-metric-name">Knowledge & Canon Recall</span>
                            <span class="matchup-metric-score" style="color: #34d399;">${modelA.knowledge} pts</span>
                        </div>
                        <div class="matchup-meter">
                            <div class="matchup-meter-fill" style="width: ${(modelA.knowledge / maxKnowledge) * 100}%; background: linear-gradient(90deg, #34d399, #059669);"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Model B Box -->
            <div class="matchup-model-box">
                <div class="matchup-model-header">
                    <div class="model-title-with-logo">
                        ${logoB}
                        <div>
                            <div class="matchup-model-title">${modelB.name}</div>
                            <span class="context-tag">Rank #${modelB.rank} • ${modelB.context}</span>
                        </div>
                    </div>
                </div>
                <div class="matchup-metric-bars">
                    <div class="matchup-metric-item">
                        <div class="matchup-metric-labels">
                            <span class="matchup-metric-name">Logic & Reasoning</span>
                            <span class="matchup-metric-score" style="color: #c084fc;">${modelB.logic} pts</span>
                        </div>
                        <div class="matchup-meter">
                            <div class="matchup-meter-fill" style="width: ${(modelB.logic / maxLogic) * 100}%; background: linear-gradient(90deg, #c084fc, #7e22ce);"></div>
                        </div>
                    </div>
                    <div class="matchup-metric-item">
                        <div class="matchup-metric-labels">
                            <span class="matchup-metric-name">Prose & Tone Quality</span>
                            <span class="matchup-metric-score" style="color: #ff2e93;">${modelB.prose} pts</span>
                        </div>
                        <div class="matchup-meter">
                            <div class="matchup-meter-fill" style="width: ${(modelB.prose / maxProse) * 100}%; background: linear-gradient(90deg, #ff66b2, #ff2e93);"></div>
                        </div>
                    </div>
                    <div class="matchup-metric-item">
                        <div class="matchup-metric-labels">
                            <span class="matchup-metric-name">Content Flexibility</span>
                            <span class="matchup-metric-score" style="color: #38bdf8;">${modelB.flexibility} pts</span>
                        </div>
                        <div class="matchup-meter">
                            <div class="matchup-meter-fill" style="width: ${(modelB.flexibility / maxFlex) * 100}%; background: linear-gradient(90deg, #38bdf8, #0284c7);"></div>
                        </div>
                    </div>
                    <div class="matchup-metric-item">
                        <div class="matchup-metric-labels">
                            <span class="matchup-metric-name">Knowledge & Canon Recall</span>
                            <span class="matchup-metric-score" style="color: #34d399;">${modelB.knowledge} pts</span>
                        </div>
                        <div class="matchup-meter">
                            <div class="matchup-meter-fill" style="width: ${(modelB.knowledge / maxKnowledge) * 100}%; background: linear-gradient(90deg, #34d399, #059669);"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delta Summary -->
        <div class="matchup-delta-summary">
            ${deltaLogicHTML}
            ${deltaProseHTML}
            ${deltaFlexHTML}
            ${deltaKnowledgeHTML}
        </div>

        <!-- Qualitative Verdict Box -->
        <div class="matchup-takeaway-card">
            <h4>Evaluator Matchup Breakdown</h4>
            <p>${takeawayText}</p>
        </div>
    `;
}

// Helper to format individual delta box
function formatDeltaBox(title, diff, nameA, nameB) {
    if (diff === 0) {
        return `
            <div class="delta-box">
                <div class="delta-label">${title}</div>
                <div class="delta-val delta-tie">Even (0)</div>
            </div>
        `;
    }
    const winnerClass = diff > 0 ? 'delta-winner-a' : 'delta-winner-b';
    const leaderName = diff > 0 ? nameA : nameB;
    const sign = diff > 0 ? `+${diff}` : `+${Math.abs(diff)}`;

    return `
        <div class="delta-box">
            <div class="delta-label">${title}</div>
            <div class="delta-val ${winnerClass}">${sign} pts</div>
            <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 0.2rem;">${leaderName} leads</div>
        </div>
    `;
}

// Open Modal with Detailed Model Evaluation
function openModelModal(model) {
    const brand = getBrandLogoInfo(model.name);
    const logoHTML = brand.img 
        ? `<div class="card-brand-logo modal-brand-logo" style="background: ${brand.bg};"><img src="${brand.img}" alt="${model.name} logo" class="brand-logo-img" onerror="this.style.display='none'; this.parentElement.innerHTML='${brand.letter}'"></div>`
        : `<div class="card-brand-logo modal-brand-logo" style="background: ${brand.bg};"><span class="brand-logo-letter">${brand.letter}</span></div>`;

    // Dynamic Quirk Callout
    let quirkCallout = '';
    if (model.name.includes('ChatGPT')) {
        quirkCallout = `
            <div class="modal-quirk-callout">
                <span>⚠ <strong>Hallucination Caveat:</strong> Exhibits 92% hallucination severity rate despite top retrieval needle accuracy.</span>
                <a href="#quirk-chatgpt" class="modal-quirk-jump" onclick="closeModelModal();">View Quirk &rarr;</a>
            </div>
        `;
    } else if (model.name.includes('Gemini 3.1 Pro')) {
        quirkCallout = `
            <div class="modal-quirk-callout">
                <span>✦ <strong>Instruction Drift:</strong> Slightly resists character arc progression and requires anti-sycophancy prompts.</span>
                <a href="#quirk-gemini" class="modal-quirk-jump" onclick="closeModelModal();">View Quirk &rarr;</a>
            </div>
        `;
    } else if (model.name.includes('Kimi')) {
        quirkCallout = `
            <div class="modal-quirk-callout">
                <span>⏱ <strong>Reasoning Token Tax:</strong> Heavy context drain on internal CoT tokens before prose streaming begins.</span>
                <a href="#quirk-kimi" class="modal-quirk-jump" onclick="closeModelModal();">View Quirk &rarr;</a>
            </div>
        `;
    } else if (model.name.includes('Opus 5')) {
        quirkCallout = `
            <div class="modal-quirk-callout">
                <span>📉 <strong>Logic Regression:</strong> Opus 4.8 scores higher in logic (480) than Opus 5 (400).</span>
                <a href="#quirk-opus" class="modal-quirk-jump" onclick="closeModelModal();">View Quirk &rarr;</a>
            </div>
        `;
    }

        const maxLogic = Math.max(500, ...modelsData.map(m => m.logic));
        const maxProse = Math.max(500, ...modelsData.map(m => m.prose));
        const maxFlex = Math.max(500, ...modelsData.map(m => m.flexibility));
        const maxKnowledge = Math.max(500, ...modelsData.map(m => m.knowledge));

        modalContent.innerHTML = `
        <div class="modal-header-section">
            <div class="modal-rank-badge">#${model.rank}</div>
            <div class="modal-title-area">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    ${logoHTML}
                    <h2>${model.name}</h2>
                </div>
                <span class="context-tag">${model.context} Context Window</span>
            </div>
        </div>

        ${quirkCallout}

        <div class="modal-score-grid">
            <div class="modal-score-box box-logic">
                <div class="modal-score-num" style="color: #c084fc;">${model.logic}</div>
                <div class="modal-vector-track"><div class="modal-vector-bar bar-logic" style="width: ${(model.logic / maxLogic) * 100}%; background: linear-gradient(90deg, #c084fc, #7e22ce); box-shadow: 0 0 10px rgba(192, 132, 252, 0.7);"></div></div>
                <div class="modal-score-label" style="color: #c084fc;">Logic</div>
            </div>
            <div class="modal-score-box box-prose">
                <div class="modal-score-num" style="color: #ff2e93;">${model.prose}</div>
                <div class="modal-vector-track"><div class="modal-vector-bar bar-prose" style="width: ${(model.prose / maxProse) * 100}%; background: linear-gradient(90deg, #ff66b2, #ff2e93); box-shadow: 0 0 10px rgba(255, 46, 147, 0.7);"></div></div>
                <div class="modal-score-label" style="color: #ff66b2;">Prose</div>
            </div>
            <div class="modal-score-box box-flex">
                <div class="modal-score-num" style="color: #38bdf8;">${model.flexibility}</div>
                <div class="modal-vector-track"><div class="modal-vector-bar bar-flex" style="width: ${(model.flexibility / maxFlex) * 100}%; background: linear-gradient(90deg, #38bdf8, #0284c7); box-shadow: 0 0 10px rgba(56, 189, 248, 0.7);"></div></div>
                <div class="modal-score-label" style="color: #38bdf8;">Flexibility</div>
            </div>
            <div class="modal-score-box box-knowledge">
                <div class="modal-score-num" style="color: #34d399;">${model.knowledge}</div>
                <div class="modal-vector-track"><div class="modal-vector-bar bar-knowledge" style="width: ${(model.knowledge / maxKnowledge) * 100}%; background: linear-gradient(90deg, #34d399, #059669); box-shadow: 0 0 10px rgba(52, 211, 153, 0.7);"></div></div>
                <div class="modal-score-label" style="color: #34d399;">Knowledge</div>
            </div>
        </div>

        <div class="modal-desc-box">
            <h4 style="color: var(--primary-pink); margin-bottom: 0.5rem; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 1px;">Evaluator Deep-Dive Notes</h4>
            <p>${model.desc}</p>
        </div>
    `;

    modelModalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModelModal() {
    modelModalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
}

// Event Listeners for Filters & Sorting
sortButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        sortButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSort = btn.getAttribute('data-sort');
        renderLeaderboard();
    });
});

filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentFilter = pill.getAttribute('data-filter');
        renderLeaderboard();
    });
});

// Search input handling
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        if (clearSearchBtn) {
            clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
        }
        renderLeaderboard();
    });
}

if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        clearSearchBtn.style.display = 'none';
        renderLeaderboard();
        searchInput.focus();
    });
}

if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', () => {
        searchQuery = '';
        currentFilter = 'all';
        currentSort = 'rank';
        if (searchInput) searchInput.value = '';
        if (clearSearchBtn) clearSearchBtn.style.display = 'none';
        
        filterPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-filter') === 'all'));
        sortButtons.forEach(b => b.classList.toggle('active', b.getAttribute('data-sort') === 'rank'));
        renderLeaderboard();
    });
}

// Global keyboard shortcut ('/' to search)
window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        if (searchInput) {
            searchInput.focus();
            searchInput.select();
        }
    }
    if (e.key === 'Escape') {
        if (modelModalBackdrop.classList.contains('active')) {
            closeModelModal();
        }
    }
});

// Modal Close Triggers
if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModelModal);
}

if (modelModalBackdrop) {
    modelModalBackdrop.addEventListener('click', (e) => {
        if (e.target === modelModalBackdrop) {
            closeModelModal();
        }
    });
}

// System Instruction Harness Actions
if (copyHarnessBtn) {
    copyHarnessBtn.addEventListener('click', async () => {
        const textToCopy = harnessBody.innerText;
        try {
            await navigator.clipboard.writeText(textToCopy);
            copyHarnessBtn.classList.add('copied');
            const originalHTML = copyHarnessBtn.innerHTML;
            copyHarnessBtn.innerHTML = `<span>Copied!</span>`;
            setTimeout(() => {
                copyHarnessBtn.classList.remove('copied');
                copyHarnessBtn.innerHTML = originalHTML;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy harness: ', err);
        }
    });
}

if (toggleExpandBtn) {
    toggleExpandBtn.addEventListener('click', () => {
        harnessBody.classList.toggle('expanded');
        const isExpanded = harnessBody.classList.contains('expanded');
        toggleExpandBtn.querySelector('.btn-text').textContent = isExpanded ? 'Minimize' : 'Expand';
        if (harnessFade) {
            harnessFade.style.display = isExpanded ? 'none' : 'block';
        }
    });
}

if (exportHarnessBtn) {
    exportHarnessBtn.addEventListener('click', () => {
        const harnessText = harnessBody.innerText;
        const blob = new Blob([harnessText], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'system-harness.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}

// Export Benchmark Leaderboard as Markdown
if (exportMarkdownBtn) {
    exportMarkdownBtn.addEventListener('click', async () => {
        let md = `# LLM Creative Writing Benchmark Beta V3\n\n`;
        md += `> **Important Note**: I actually haven't tested or am testing models FOR v3. So that's why you won't see it.\n\n`;
        md += `> **Scale**: 600 Tests | 12 Genres | 150 Unique Samples\n`;
        md += `> **Sol Baseline**: 50 Logic / 250 Prose / 100 Flex / 200 Knowledge (Uncapped Scale)\n\n`;
        md += `| Rank | Model Name | Logic | Prose | Flexibility | Knowledge | Context Window | Evaluator Notes |\n`;
        md += `|:---:|:---|:---:|:---:|:---:|:---:|:---:|:---|\n`;

        modelsData.forEach(m => {
            md += `| #${m.rank} | **${m.name}** | ${m.logic} | ${m.prose} | ${m.flexibility} | ${m.knowledge} | ${m.context} | ${m.desc} |\n`;
        });

        try {
            await navigator.clipboard.writeText(md);
            const originalHTML = exportMarkdownBtn.innerHTML;
            exportMarkdownBtn.classList.add('copied');
            exportMarkdownBtn.innerHTML = `<span>Copied Table!</span>`;
            setTimeout(() => {
                exportMarkdownBtn.classList.remove('copied');
                exportMarkdownBtn.innerHTML = originalHTML;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy markdown: ', err);
        }
    });
}

// Share Link
if (shareLinkBtn) {
    shareLinkBtn.addEventListener('click', async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'LLM Creative Writing Benchmark Beta V3',
                    text: 'Explore frontier LLM creative writing benchmark rankings, logic vs prose scores, and system prompt harness.',
                    url: window.location.href
                });
            } catch (err) {
                console.log('Share dismissed');
            }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                const originalHTML = shareLinkBtn.innerHTML;
                shareLinkBtn.classList.add('copied');
                shareLinkBtn.innerHTML = `<span>Link Copied!</span>`;
                setTimeout(() => {
                    shareLinkBtn.classList.remove('copied');
                    shareLinkBtn.innerHTML = originalHTML;
                }, 2000);
            } catch (err) {
                console.error('Failed to copy link: ', err);
            }
        }
    });
}

// Floating Back to Top Button
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Fast Smooth Scroll Engine for all anchor links & buttons
document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const targetId = anchor.getAttribute('href').substring(1);
    if (!targetId) return;

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        e.preventDefault();
        
        // Custom offset scroll accounting for zoom
        const elementRect = targetElement.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        const targetScrollPosition = absoluteElementTop - 30;

        window.scrollTo({
            top: Math.max(0, targetScrollPosition),
            behavior: 'smooth'
        });

        // Flash target section for instant visual confirmation
        targetElement.style.transition = 'box-shadow 0.3s ease';
        targetElement.style.boxShadow = '0 0 35px rgba(255, 46, 147, 0.45)';
        setTimeout(() => {
            targetElement.style.boxShadow = '';
        }, 1200);
    }
});

// Chart Dimension Tab Switcher
function initChartDimensionTabs() {
    const tabBtns = document.querySelectorAll('.chart-tab-btn');
    const chartsGrid = document.querySelector('.benchmark-charts-grid');
    const cards = {
        logic: document.getElementById('card-chart-logic'),
        prose: document.getElementById('card-chart-prose'),
        flex: document.getElementById('card-chart-flex'),
        knowledge: document.getElementById('card-chart-knowledge')
    };

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const targetChart = btn.getAttribute('data-chart');
            if (targetChart === 'all') {
                if (chartsGrid) chartsGrid.classList.remove('single-view');
                Object.values(cards).forEach(card => {
                    if (card) {
                        card.style.display = 'flex';
                        card.style.animation = 'none';
                        void card.offsetHeight;
                        card.style.animation = '';
                    }
                });
            } else {
                if (chartsGrid) chartsGrid.classList.add('single-view');
                Object.entries(cards).forEach(([key, card]) => {
                    if (card) {
                        if (key === targetChart) {
                            card.style.display = 'flex';
                            card.style.animation = 'none';
                            void card.offsetHeight;
                            card.style.animation = '';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            }
        });
    });
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    animateStats();
    renderComparativeCharts();
    initChartDimensionTabs();
    initMatchupDropdowns();
    renderLeaderboard();
});
