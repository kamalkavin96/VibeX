export const gradients = [
  "from-blue-500 to-indigo-500",
  "from-emerald-500 to-teal-500",
  "from-violet-500 to-purple-500",
  "from-pink-500 to-rose-500",
  "from-orange-500 to-amber-500",
];

export const randomGradient = () =>
  gradients[Math.floor(Math.random() * gradients.length)];
