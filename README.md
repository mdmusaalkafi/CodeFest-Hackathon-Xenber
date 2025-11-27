**PEKOM CODE FEST - HACKATHON Xenber (Track 2)**

**The Problem**
Financial institutions rely heavily on structured data (credit scores, income). However, they miss the behavioral context hidden in unstructured text:
Why is the applicant asking for this loan?
Does their story match their financial reality?
Are there linguistic markers of desperation, speculation, or deceit?

**The Solution**
Credit Guardian is a hybrid risk assessment engine. It combines numerical financial data with LLM-driven behavioral analysis to provide a holistic risk score.
It acts as an automated "Senior Risk Officer," flagging inconsistencies that a spreadsheet would miss (e.g., a high-income applicant using gambling terminology).

**Key Features**
Cognitive Context Analysis: Uses Google Gemini 1.5 Flash to analyze loan purpose essays for behavioral red flags.
Cross-Reference Logic: Automatically detects if the applicant's story contradicts their income/loan ratio.
Dynamic Risk Scoring: Generates a weighted risk score (0-100) based on multi-modal data.
Traffic Light Decision System: Instant "Approve," "Review," or "Reject" recommendations.
UI: A modern, high-trust Fintech interface built with Tailwind CSS.

**Architecture Flow**
    A[User Input] -->|Form Data| B(Next.js Frontend)
    B -->|POST JSON| C{API Route / Server}
    C -->|System Prompt + Data| D[Google Gemini AI]
    D -->|Risk Analysis JSON| C
    C -->|Risk Score & Flags| B
    B -->|Render Dashboard| A

**Demo Scenarios (For Judges)**
To test the AI's behavioral detection, try these scenarios:
Scenario 1: The Hidden Gem (Approval)
Income: $0 (Student)
Loan: $2,000
Story: "I am a final year CS student with a signed offer letter from Google starting next month. Need relocation funds."
Result: Low Risk (AI detects "Future Income" context).

Scenario 2: The Hidden Risk (Rejection)
Income: $80,000
Loan: $20,000
Story: "I have a sure-thing investment tip. Guaranteed to double in a week. Need cash fast."
Result: High Risk (AI detects "Gambling/Speculation" behavior).

**Acknowledgements**
Built for PEKOM CODE FEST 2024.
Track: 2 (LLM-Based Risk Assessment)
Live url: https://pekomcodefestxenber.netlify.app/
