module.exports = {
  getHtml: (code) => {
    return (
      '<!DOCTYPE html><html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>' +
      '<title> Welcome to Coded Mails </title>' +
      '<meta http-equiv="X-UA-Compatible" content="IE=edge" />' +
      '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
      '<meta name="viewport" content="width=device-width, initial-scale=1" />' +
      '<style type="text/css">' +
      '#outlook a {' +
      'padding: 0;' +
      '}' +
      'body {' +
      'margin: 0;' +
      'padding: 0;' +
      '-webkit-text-size-adjust: 100%;' +
      '-ms-text-size-adjust: 100%;' +
      '}' +
      'table,' +
      'td {' +
      'border-collapse: collapse;' +
      'mso-table-lspace: 0pt;' +
      'mso-table-rspace: 0pt;' +
      '}' +
      'img {' +
      'border: 0;' +
      'height: auto;' +
      'line-height: 100%;' +
      'outline: none;' +
      'text-decoration: none;' +
      '-ms-interpolation-mode: bicubic;' +
      '}' +
      'p {' +
      'display: block;' +
      'margin: 13px 0;' +
      '}' +
      '</style>' +
      '<style type="text/css">' +
      '@media only screen and (min-width:480px) {' +
      '.mj-column-per-100 {' +
      'width: 100% !important;' +
      'max-width: 100%;' +
      '}' +
      '}' +
      '</style>' +
      '<style type="text/css">' +
      '@media only screen and (max-width:480px) {' +
      'table.mj-full-width-mobile {' +
      'width: 100% !important;' +
      '}' +
      'td.mj-full-width-mobile {' +
      'width: auto !important;' +
      '}' +
      '}' +
      '</style>' +
      '<style type="text/css">' +
      'a,' +
      'span,' +
      'td,' +
      'th {' +
      '-webkit-font-smoothing: antialiased !important;' +
      '-moz-osx-font-smoothing: grayscale !important;' +
      '}' +
      '</style>' +
      '</head>' +
      '<body style="background-color:#ffffff;" data-new-gr-c-s-check-loaded="14.1081.0" data-gr-ext-installed="">' +
      `<div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">您的验证码为: ${code}。</div>` +
      '<div style="background-color:#ffffff;">' +
      '<div style="margin:0px auto;max-width:600px;">' +
      '<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">' +
      '<tbody>' +
      '<tr>' +
      '<td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;text-align:center;">' +
      '<div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">' +
      '<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">' +
      '<tbody><tr>' +
      '<td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">' +
      '<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">' +
      '<tbody>' +
      '<tr>' +
      '<td style="width:100px;">' +
      '<img alt="SeeDAO Logo" height="auto" src="https://imgur.com/UdNNqsk.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:34px;" width="250" />' +
      '</td>' +
      '</tr>' +
      '</tbody>' +
      '</table>' +
      '</td>' +
      '</tr>' +
      '<tr>' +
      '<td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">' +
      '<div style="font-family:Helvetica, Arial, sans-serif;font-size:18px;font-weight:400;line-height:24px;text-align:left;color:#434245;">' +
      '<h1 style="margin: 0; font-size: 24px; line-height: normal; font-weight: bold;">验证码</h1>' +
      '</div>' +
      '</td>' +
      '</tr>' +
      '</tbody></table>' +
      '</div>' +
      '</td>' +
      '</tr>' +
      '</tbody>' +
      '</table>' +
      '</div>' +
      '<div style="margin:0px auto;max-width:600px;">' +
      '<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">' +
      '<tbody>' +
      '<tr>' +
      '<td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">' +
      '<div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">' +
      '<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">' +
      '<tbody><tr>' +
      '<td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">' +
      '<div style="font-family:Helvetica, Arial, sans-serif;font-size:18px;font-weight:400;line-height:24px;text-align:left;color:#434245;">' +
      '<p style="margin: 5px 0;">我们收到您请求验证电子邮件。以下是您的 SeeDAO 验证码：</p>' +
      '</div>' +
      '</td>' +
      '</tr>' +
      '<tr>' +
      '<td align="left" vertical-align="middle" style="font-size:0px;padding:10px 25px;word-break:break-word;">' +
      '<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">' +
      '<tbody><tr>' +
      '<td>' +
      `<h1 style="margin: 0; font-size: 36px; line-height: normal; font-weight: bold;"> ${code} </h1>` +
      '</td>' +
      '</tr>' +
      '</tbody></table>' +
      '</td>' +
      '</tr>' +
      '<tr>' +
      '<td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">' +
      '<div style="font-family:Helvetica, Arial, sans-serif;font-size:18px;font-weight:400;line-height:24px;text-align:left;color:#434245;">' +
      '<p style="margin: 5px 0;">假使您并未索取验证码，那么可能有其他人尝试存取您的 SeeDAO 账户。请勿将这组验证码转寄或提供给任何人。</p>' +
      '</div>' +
      '</td>' +
      '</tr>' +
      '<tr>' +
      '<td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">' +
      '<br/><br/><div style="font-family:Helvetica, Arial, sans-serif;font-size:18px;font-weight:bold;line-height:24px;text-align:left;color:#434245;">SeeDAO</div>' +
      '</td>' +
      '</tr>' +
      '<tr>' +
      '<td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">' +
      '<table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">' +
      '<tbody><tr>' +
      '<td style="padding:4px;">' +
      '<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:18px;">' +
      '<tbody><tr>' +
      '<td style="font-size:0;height:18px;vertical-align:middle;width:18px;">' +
      '<a href="https://mobile.twitter.com/see_dao" target="_blank" style="color: #2e58ff; text-decoration: none;">' +
      '<img alt="twitter-logo" height="18" src="https://codedmails.com/images/social/black/twitter-logo-transparent-black.png" style="border-radius:3px;display:block;" width="18" />' +
      '</a>' +
      '</td>' +
      '</tr>' +
      '</tbody></table>' +
      '</td>' +
      '</tr>' +
      '</tbody></table>' +
      '<table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">' +
      '<tbody><tr>' +
      '<td style="padding:4px;">' +
      '<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:18px;">' +
      '<tbody><tr>' +
      '<td style="font-size:0;height:18px;vertical-align:middle;width:18px;">' +
      '<a href="https://discord.gg/seedao" target="_blank" style="color: #2e58ff; text-decoration: none;">' +
      '<img alt="discord-logo" height="18" src="https://www.freeiconspng.com/uploads/discord-black-icon-1.png" style="border-radius:3px;display:block;" width="18" />' +
      '</a>' +
      '</td>' +
      '</tr>' +
      '</tbody></table>' +
      '</td>' +
      '</tr>' +
      '</tbody></table>' +
      '<table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">' +
      '<tbody><tr>' +
      '<td style="padding:4px;">' +
      '<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:18px;">' +
      '<tbody><tr>' +
      '<td style="font-size:0;height:18px;vertical-align:middle;width:18px;">' +
      '</td>' +
      '</tr>' +
      '</tbody></table>' +
      '</td>' +
      '</tr>' +
      '</tbody></table>' +
      '</td>' +
      '</tr>' +
      '</tbody></table>' +
      '</div>' +
      '</td>' +
      '</tr>' +
      '</tbody>' +
      '</table>' +
      '</div>' +
      '<div style="margin:0px auto;max-width:600px;">' +
      '<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">' +
      '<tbody>' +
      '<tr>' +
      '<td style="direction:ltr;font-size:0px;padding:20px 0;padding-top:0;text-align:center;">' +
      '<div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">' +
      '<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">' +
      '<tbody><tr>' +
      '<td style="font-size:0px;padding:10px 25px;word-break:break-word;">' +
      '<p style="border-top: dashed 1px lightgrey; font-size: 1px; margin: 0px auto; width: 100%;">' +
      '</p>' +
      '</td>' +
      '</tr>' +
      '<tr>' +
      '<td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">' +
      '<div style="font-family:Helvetica, Arial, sans-serif;font-size:14px;font-weight:400;line-height:24px;text-align:left;color:#999999;">此邮件由系统自动发出,请勿直接回复</div>' +
      '</td>' +
      '</tr>' +
      '<tr>' +
      '</tbody></table>' +
      '</div>' +
      '</td>' +
      '</tr>' +
      '</tbody>' +
      '</table>' +
      '</div>' +
      '<div style="margin:0px auto;max-width:600px;">' +
      '<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">' +
      '<tbody>' +
      '<tr>' +
      '<td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">' +
      '<div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">' +
      '<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">' +
      '<tbody><tr>' +
      '<td style="font-size:0px;word-break:break-word;">' +
      '<div style="height:1px;">   </div>' +
      '</td>' +
      '</tr>' +
      '</tbody></table>' +
      '</div>' +
      '</td>' +
      '</tr>' +
      '</tbody>' +
      '</table>' +
      '</div>' +
      '</div>' +
      '</body><grammarly-desktop-integration data-grammarly-shadow-root="true"></grammarly-desktop-integration></html>'
    );
  },
};
