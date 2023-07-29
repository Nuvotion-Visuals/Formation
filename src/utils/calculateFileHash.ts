import SparkMD5 from 'spark-md5';

interface HashFunction {
  (file: File): Promise<string>;
}

export const calculateFileHash: HashFunction = (file) => {
  const chunkSize = file.size / Math.floor(file.size / 2048); // Use variable chunk size based on file size
  const chunks = Math.floor(file.size / chunkSize); // Ensure all chunks are the same size (except for the last chunk)
  let currentChunk = 0;
  const spark = new SparkMD5.ArrayBuffer();
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onload = (e) => {
      // read chunk
      // @ts-ignore
      spark.append(e?.target?.result);
      currentChunk++;

      if (currentChunk < chunks) {
        loadNext();
      } else {
        resolve(spark.end());
      }
    };

    fileReader.onerror = (error) => {
      reject(error); // Reject the promise with the error
    };

    const loadNext = () => {
      const start = currentChunk * chunkSize;
      const end = (start + chunkSize >= file.size) ? file.size : start + chunkSize;
      fileReader.readAsArrayBuffer(file.slice(start, end));
    };

    loadNext();
  });
};