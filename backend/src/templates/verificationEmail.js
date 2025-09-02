export const verificationEmailTemplate = (name, verificationLink) => {
  return `
    <body style="background:#f6f6f6; font-family:Arial, sans-serif; margin:0; padding:0;">
    <div style="max-width:500px; margin:40px auto; background:#fff; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.08); padding:32px 24px;">
        
        <h1 style="font-family:Arial, sans-serif; background:#000; color:#fff; text-align:center; padding:8px; border-radius:5px;">
        Textrovert
        </h1>

        <h2 style="color:#333; margin-bottom:16px;">Welcome, ${name} 👋</h2>
        <p style="color:#555; font-size:16px; margin-bottom:24px;">
        You're almost set to start enjoying Textrovert. Please verify your account by clicking the button below. 
        This link expires in <strong>1 hour</strong>.
        </p>

        <div style="text-align:center; margin-bottom:20px;">
        <a href="${verificationLink}" target="_blank"
            style="display:inline-block; padding:12px 32px; background:#555; color:#fff; text-decoration:none;
                    border-radius:4px; font-weight:bold; font-size:16px;">
            Verify Email
        </a>
        </div>

        <p style="font-size:14px; color:#777;">
        If the button doesn’t work, copy and paste this link into your browser: <br>
        <a href="${verificationLink}" style="color:#2563eb; word-break:break-all;">${verificationLink}</a>
        </p>

        <p style="color:#555; font-size:14px;">If you did not create an account, you can safely ignore this email.</p>

        <div style="margin-top:32px; text-align:center; font-size:13px; background:#201f1f; color:#fff; padding:8px; border-radius:5px;">
        From <strong>ByteMe</strong>
        </div>
    </div>
    </body>
  `;
};
