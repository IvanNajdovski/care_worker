import { AppContext } from '@/models/zod';

export class ResendEmailService {
  static sendRegistrationEmail = async (c: AppContext, body, token: string) => {
    const apiKey = c.env.RESEND_API_KEY;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        from: 'Care <onboarding@resend.dev>',
        to: [body.email],
        subject: 'Confirm your Care account',
        html: this.generateEmailBody(token),
      }),
    });

    if (!res.ok) {
      throw new Error(`Resend API error: ${await res.text()}`);
    }

    return await res.json();
  };

  static generateEmailBody = (token: string) => {
    const redirectUrl = `http://localhost:3000?token=${token}`;

    return `<div role="document">
<div tabindex="0" aria-label="Message body" class="ulb23 GNqVo allowTextSelection OuGoX" id="UniqueMessageBody_2">
<div class="BIZfh">
<div visibility="visible">
<div class="rps_8b16">
<div style="background-color:#000000; margin:0 auto">
<table style="max-width:600px; border-radius:5px; margin:0 auto 40px; padding:120px 20px 120px 20px; text-align:center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" align="center">
<tbody>
<tr style="width:100%">
<td>
<p style="font-size:48px; line-height:48px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif; color:#fdfdfd; font-weight:400; margin:0 0 30px; margin-top:0; margin-right:0; margin-bottom:30px; margin-left:0">Confirm Your Account</p>
<p style="font-size: 16px; line-height: 24px; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; color: rgb(171, 171, 171) !important; font-weight: normal; letter-spacing: 0.3px; margin: 0px 0px 40px;" data-ogsc="rgb(132, 132, 132)">Thank you for signing up for Care. To confirm your account, please click the button below.</p>
<table style="margin:0 0 40px" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" align="center">
<tbody>
<tr>
<td>
<a style="line-height: 24px; text-decoration: none; display: inline-block; max-width: 100%; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; background-color: rgb(42, 42, 42) !important; border-radius: 22px; color: rgb(255, 255, 255) !important; font-size: 16px; font-weight: 600; text-align: center; padding: 16px 48px;" data-auth="NotApplicable" rel="noopener noreferrer" target="_blank" href="${redirectUrl}" data-linkindex="0" title="${redirectUrl}" data-ogsc="rgb(0, 0, 0)" data-ogsb="rgb(253, 253, 253)">
<span data-ogsc="" style="color: rgb(255, 255, 255) !important;"></span>
<span style="max-width: 100%; display: inline-block; line-height: 120%; color: rgb(255, 255, 255) !important;" data-ogsc="">Confirm Account</span>
<span data-ogsc="" style="color: rgb(255, 255, 255) !important;"></span>
</a>
</td>
</tr>
</tbody>
</table>
<p style="font-size: 16px; line-height: 24px; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; color: rgb(171, 171, 171) !important; margin-top: 96px; margin-bottom: 16px;" data-ogsc="rgb(132, 132, 132)">1000 Skopje #5039<br><Macedonia></p>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</div>
</div>
<div class="g4Y3U">
</div>
</div>`;
  };
}
