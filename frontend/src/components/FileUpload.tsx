interface Props {
  onFileUpload: (file: File) => void;
}

function FileUpload({ onFileUpload }: Props) {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="file"
        accept=".csv"
        onChange={handleChange}
      />
    </div>
  );
}

export default FileUpload;