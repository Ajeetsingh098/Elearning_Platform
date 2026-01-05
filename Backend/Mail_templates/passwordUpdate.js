module.exports = function passwordResetTemplate(url) {
  return `
  <!DOCTYPE html>
  <html>
  <body style="
    margin:0;
    padding:0;
    width:100%;
    background:#f5f7fa;
    font-family:'Segoe UI', Arial, sans-serif;
  ">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fa;">
      <tr>
        <td align="center" style="padding:40px 10px;">
          
          <!-- Main Card -->
          <table width="100%" cellpadding="0" cellspacing="0" style="
            max-width:520px;
            background:#ffffff;
            border-radius:16px;
            box-shadow:0 8px 25px rgba(0,0,0,0.08);
            padding:35px 40px;
          ">
            <tr>
              <td align="center" style="padding-bottom:25px;">
                <img src="https://thewealthmosaic.s3.amazonaws.com/media/Logo_atpoint.png"
                  alt="ATpoint Logo"
                  width="80"
                  style="display:block; margin-bottom:10px; opacity:0.85;" />
                
                <h2 style="
                  font-size:24px;
                  margin:0;
                  color:#1d1d1f;
                  font-weight:700;
                ">
                  Password Reset Request
                </h2>
              </td>
            </tr>

            <tr>
              <td style="
                font-size:15px;
                line-height:1.6;
                color:#3a3a3c;
                text-align:left;
              ">
                Hi,<br><br>
                We received a request to reset your password for your <b>ATpoint</b> account.
                Click the button below to create a new password.
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:30px 0;">
                <a href="${url}" style="
                  display:inline-block;
                  padding:12px 30px;
                  background:#4a6cf7;
                  color:#ffffff;
                  text-decoration:none;
                  border-radius:8px;
                  font-weight:600;
                  font-size:15px;
                ">
                  Reset Password
                </a>
              </td>
            </tr>

            <tr>
              <td style="
                font-size:14px;
                color:#555;
                text-align:left;
              ">
                If you didn’t request a password reset, you can safely ignore this email.
                This link will expire in <b>15 minutes</b> for security reasons.
              </td>
            </tr>

            <tr>
              <td style="
                font-size:14px;
                color:#555;
                padding-top:15px;
                text-align:left;
              ">
                Or copy and paste this link into your browser:<br>
                <span style="color:#4a6cf7; word-break:break-all;">
                  ${url}
                </span>
              </td>
            </tr>

            <tr>
              <td style="padding-top:30px;">
                <hr style="border:none; border-top:1px solid #e6e6e6;" />
              </td>
            </tr>

            <tr>
              <td align="center" style="
                font-size:13px;
                color:#777;
                padding-top:10px;
              ">
                Need help? Contact us at
                <a href="mailto:support@atpoint.com" style="
                  color:#4a6cf7;
                  text-decoration:none;
                ">
                  support@atpoint.com
                </a>
              </td>
            </tr>

            <tr>
              <td align="center" style="
                font-size:12px;
                color:#a1a1a1;
                padding-top:10px;
              ">
                © 2025 ATpoint. All rights reserved.
              </td>
            </tr>
          </table>
          <!-- End Card -->

        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};
