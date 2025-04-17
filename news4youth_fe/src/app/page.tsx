import styles from "./page.module.css";
export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <h1 style={{ fontSize: "3rem", marginBottom: "2rem" }}>
          NEWS FOR YOUTH
        </h1>

        <p style={{ maxWidth: "600px", marginBottom: "1rem" }}>
          청소년들을 위한 다양한 뉴스를 한곳에서 만나보세요. 시사, 문화, 교육,
          진로 등 다채로운 분야의 소식을 쉽고 빠르게 전달합니다.
        </p>
        <p style={{ maxWidth: "600px" }}>
          평범한 일상 속에서도 세상을 향한 눈을 키워나갈 수 있도록
          <strong> News For Youth </strong>가 든든한 정보 파트너가
          되어드리겠습니다. 청소년들의 미래가 더 밝아질 수 있도록 최선을
          다하겠습니다!
        </p>
      </main>
    </>
  );
}
