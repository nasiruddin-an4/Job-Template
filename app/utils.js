
export function parseJobDescription(html) {
  if (!html) return {};

  const details = {
    location: "Not Specified",
    salary: "Negotiable",
    jobType: "Full-time",
    shift: "Day Shift",
    workDays: "Not Specified",
    experience: "Not Specified",
    deadline: "Not Specified",
  };

  // Helper to remove HTML tags and normalize text
  const cleanText = (str) => {
    return str.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  };

  // Convert HTML to simple text lines for easier regex matching
  const lines = html.split(/<\/p>|<\/div>|<br\s*\/?>/i).map(cleanText).filter(Boolean);

  lines.forEach(line => {
    const lowerLine = line.toLowerCase();
    
    if (line.includes('𝐋𝐨𝐜𝐚𝐭𝐢𝐨𝐧:')) details.location = line.split('𝐋𝐨𝐜𝐚𝐭𝐢𝐨𝐧:')[1].trim();
    else if (lowerLine.includes('location:')) details.location = line.split(/location:/i)[1].trim();

    if (line.includes('𝐒𝐚𝐥𝐚𝐫𝐲:')) details.salary = line.split('𝐒𝐚𝐥𝐚𝐫𝐲:')[1].trim();
    else if (line.includes('𝐒𝐚𝐥𝐚𝐫𝐲 𝐑𝐚𝐧𝐠𝐞:')) details.salary = line.split('𝐒𝐚𝐥𝐚𝐫𝐲 𝐑𝐚𝐧𝐠𝐞:')[1].trim();
    else if (lowerLine.includes('salary:')) details.salary = line.split(/salary:/i)[1].trim();

    if (line.includes('𝐉𝐨𝐛 𝐓𝐲𝐩𝐞:')) details.jobType = line.split('𝐉𝐨𝐛 𝐓𝐲𝐩𝐞:')[1].trim();
    else if (lowerLine.includes('job type:')) details.jobType = line.split(/job type:/i)[1].trim();

    if (line.includes('𝐒𝐡𝐢𝐟𝐭:')) details.shift = line.split('𝐒𝐡𝐢𝐟𝐭:')[1].trim();
    else if (lowerLine.includes('shift:')) details.shift = line.split(/shift:/i)[1].trim();

    if (line.includes('𝐖𝐨𝐫𝐤 𝐃𝐚𝐲𝐬:')) details.workDays = line.split('𝐖𝐨𝐫𝐤 𝐃𝐚𝐲𝐬:')[1].trim();
    else if (lowerLine.includes('work days:')) details.workDays = line.split(/work days:/i)[1].trim();

    if (line.includes('𝐄𝐱𝐩𝐞𝐫𝐢𝐞𝐧𝐜𝐞:')) details.experience = line.split('𝐄𝐱𝐩𝐞𝐫𝐢𝐞𝐧𝐜𝐞:')[1].trim();
    else if (lowerLine.includes('experience:')) details.experience = line.split(/experience:/i)[1].trim();
  });

  // Try to find deadline if mentioned
  const deadlineMatch = html.match(/Apply By:?\s*([^<]+)/i) || html.match(/Deadline:?\s*([^<]+)/i);
  if (deadlineMatch) details.deadline = cleanText(deadlineMatch[1]);

  return details;
}
