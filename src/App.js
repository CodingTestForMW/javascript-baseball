class App {
  /**
   * 게임을 시작합니다.
   */
  async play() {
    console.log("숫자 야구 게임을 시작합니다.");

    this.computerNumbers = this.generateRandomNumbers(); // 컴퓨터 번호 생성

    while (true) {
      try{
        const userInput = prompt("숫자를 입력해주세요 (서로 다른 3자리 숫자):"); // 유저 인풋


      }catch(err){
        console.error(err.message);
      }
    }
  }

  /**
   * 서로 다른 1~9 사이의 임의의 숫자 3개를 생성합니다.
   */
  generateRandomNumbers() {
    const numbers = [];
    while (numbers.length < 3) {
      const randomNum = Math.floor(Math.random() * 9) + 1;
      if (!numbers.includes(randomNum)) {
        numbers.push(randomNum);
      }
    }
    return numbers;
  }

  /**
   * 사용자 입력 검증
   */
  userValidation(userInput) {
    if (!/^\d{3}$/.test(input)) { // 3자리 숫자가 아닌 경우
      throw new Error("3자리 숫자를 입력해주세요."); // 에러 던지기
    }

    /**
     * 서로 다른 숫자 검증
     */
    const digits = input.split(""); // 배열로 변환
    if (new Set(digits).size !== 3) { // 중복된 숫자가 있는 경우
      throw new Error("서로 다른 숫자를 입력해야 합니다."); // 에러 던지기
    }
  }
}

export default App;
