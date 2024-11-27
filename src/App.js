const MissionUtils = require('@woowacourse/mission-utils');
const { Console, Random } = MissionUtils;

class App {
  play() {
    Console.print('숫자 야구 게임을 시작합니다.');
    return this.startGame(); // Promise 반환
  }

  async startGame() {
    const computerNumbers = this.generateComputerNumbers();
    try {
      await this.askUserInput(computerNumbers);
    } catch (error) {
      return Promise.reject(error); // Promise로 예외 전달
    }
  }

  generateComputerNumbers() {
    const numbers = [];
    while (numbers.length < 3) {
      const number = Random.pickNumberInRange(1, 9);
      if (!numbers.includes(number)) {
        numbers.push(number);
      }
    }
    return numbers;
  }

  async askUserInput(computerNumbers) {
    return new Promise((resolve, reject) => {
      Console.readLineAsync('숫자를 입력해주세요 : ', (input) => {
        try {
          this.validateInput(input);
          const result = this.calculateResult(computerNumbers, input);
          Console.print(result);

          if (result.includes('3스트라이크')) {
            Console.print('3개의 숫자를 모두 맞히셨습니다! 게임 종료');
            return this.askRestart().then(resolve).catch(reject);
          } else {
            this.askUserInput(computerNumbers).then(resolve).catch(reject);
          }
        } catch (error) {
          reject(error); // 비동기에서 예외 처리
        }
      });
    });
  }

   validateInput(input) {
    if (!/^\d{3}$/.test(input)) {
      throw new Error('[ERROR] 입력값은 3자리의 숫자여야 합니다.');
    }
    const digits = input.split('');
    if (new Set(digits).size !== digits.length) {
      throw new Error('[ERROR] 입력값에 중복된 숫자가 있습니다.');
    }
  }

  calculateResult(computerNumbers, userInput) {
    const userNumbers = userInput.split('').map(Number);
    let strikes = 0;
    let balls = 0;

    userNumbers.forEach((num, index) => {
      if (num === computerNumbers[index]) {
        strikes += 1;
      } else if (computerNumbers.includes(num)) {
        balls += 1;
      }
    });

    if (strikes === 0 && balls === 0) {
      return '낫싱';
    }
    return `${balls ? `${balls}볼 ` : ''}${strikes ? `${strikes}스트라이크` : ''}`.trim();
  }

  askRestart() {
    return new Promise((resolve, reject) => {
      Console.readLineAsync('게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.', (input) => {
        try {
          if (input === '1') {
            this.startGame().then(resolve).catch(reject);
          } else if (input === '2') {
            Console.print('게임을 종료합니다.');
            Console.close();
            resolve(); // 종료 시 Promise 성공적으로 종료
          } else {
            throw new Error('[ERROR] 잘못된 입력입니다. 1 또는 2를 입력하세요.');
          }
        } catch (error) {
          reject(error);
        }
      });
    });
  }
}

module.exports = App;
