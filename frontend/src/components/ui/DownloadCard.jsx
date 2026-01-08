export default function DownloadCard({ title, description, icon: Icon, file }) {
  const download = async () => {
    const res = await fetch(file);
    const blob = await res.blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = file.split("/").pop();
    a.click();
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg">
      <Icon className="text-green-700 mb-4" size={36} />
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <button
        onClick={download}
        className="text-green-700 font-semibold"
      >
        Download →
      </button>
    </div>
  );
}
