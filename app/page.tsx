// import { Gemini } from "./api/gemini";
import GenerateButton from "@/components/generate-button";
import GenerateTextArea from "@/components/generate-textarea";
import MermaidRender from "@/components/mermaid-render";

export default async function Home() {
  return (
    <main className=" min-h-screen min-w-screen grid justify-items-center items-center">
      <form
        action=""
        method="post"
        className=" max-h-fit h-44 min-h-44 min-w-2/4"
      >
        <GenerateTextArea />
        <GenerateButton />
      </form>

      {/* <MermaidRender /> */}
    </main>
  );
}
