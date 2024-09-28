export function getUserFirstAndLastChar(user) {
    if(!user) return null;
    const parts = user.name?.split(" ") || [];
    const first = parts[0]?.[0] || "";
    const last = parts[parts.length -1]?.[0] || "";
    return first  + last;
}

export function getFullName(user) {
    if(!user) return null;
    return user?.name || "";
}