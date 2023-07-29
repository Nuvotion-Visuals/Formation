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
