export async function formatMyDate(myDate) {
    const date = new Date(myDate);

    const formatted = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });

    console.log("date---", formatted);

    return formatted
}