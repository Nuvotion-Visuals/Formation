export const getInitials = (name : string) => 
  name?.split(' ').map((n,i,a)=> i === 0 || i+1 === a.length ? n[0] : null).join('').toUpperCase()

