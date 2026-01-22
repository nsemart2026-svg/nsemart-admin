const TipsBox = ({ tips }: { tips: string[] }) => {
  return (
    <div className="border rounded-lg p-6 bg-white ">
      <h2 className="font-bold text-2xl mb-6">Tips</h2>
      <ul className="list-disc list-outside text-sm text-muted-foreground space-y-1 pl-5">
        {tips.map((tip, index) => (
          <li key={index} className="whitespace-pre-wrap">
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TipsBox;
