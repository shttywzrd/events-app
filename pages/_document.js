import Document, { Head, Html, Main, NextScript } from "next/document";

class DocumentComponent extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default DocumentComponent;
