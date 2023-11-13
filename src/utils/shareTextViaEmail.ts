/**
 * @function shareTextViaEmail
 *
 * This function generates and opens a mailto: URL to enable email sharing of text content 
 * with an optional subject and sender field.
 *
 * @param {string} text - The main body of the email.
 * @param {string | undefined} subject - The subject line of the email. (optional)
 * @param {string | undefined} sender - The email address of the sender. This field may not populate on all systems. (optional)
 * 
 * @example
 * shareTextViaEmail('Here is an example email body', 'Example Subject', 'example@example.com');
 */
export const shareTextViaEmail = (text: string, subject?: string, sender?: string) => {
  let email = 'mailto:';

  if (sender) {
    email += `?sender=${encodeURIComponent(sender)}`;
  }

  if (subject) {
    email += `&subject=${encodeURIComponent(subject)}`;
  }

  email += `&body=${encodeURIComponent(text)}`;

  window.location.href = email;
}
