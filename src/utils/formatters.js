// Fichier: src/utils/formatters.js

/**
 * Formats a full ISO date string into a clean, readable format.
 * Example input: "2025-10-31T00:00:00.000000Z" and "08:00:00"
 * Example output: "31 octobre 2025 à 08:00"
 */
export function formatFullDateTime(dateString, timeString) {
  if (!dateString || !timeString) {
    return "Date non spécifiée";
  }

  const date = new Date(dateString);
  
  const dateOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC' // Important to specify UTC to avoid timezone shifts
  };
  
  const formattedDate = date.toLocaleDateString('fr-FR', dateOptions);
  
  // We only need the HH:MM part of the time string
  const formattedTime = timeString.substring(0, 5);

  return `${formattedDate} à ${formattedTime}`;
}