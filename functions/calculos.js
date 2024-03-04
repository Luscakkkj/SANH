class CalculosAntropometricos {
  constructor(idade, sexo, raca, joelho, braco) {
    this.idade = idade
    this.sexo = sexo
    this.raca = raca
    this.joelho = joelho
    this.braco = braco
  }

  peso = () => {
    let formula = undefined
    let maioridade = this.idade >= 18 && this.idade < 60
    let idoso = this.idade >= 60
    let negro = this.raca == 'NEGRO' || this.raca == 'PARDA' || this.raca == 'INDIGENA'

    switch (this.sexo) {
      case 'M':
        if (maioridade) {
          if (negro) {
            formula = (this.joelho * 1.09) + (this.braco * 3.14) - 83.72
          } else {
            formula = (this.joelho * 1.19) + (this.braco * 3.21) - 86.82
          }
        }

        else if (idoso) {
          if (negro) {
            formula = (this.joelho * 0.44) + (this.braco * 2.86) - 39.21
          } else {
            formula = (this.joelho * 1.10) + (this.braco * 3.07) - 75.81
          }
        }

        else {
          if (negro) {
            formula = (this.joelho * 0.59) + (this.braco * 2.73) - 48.32
          } else {
            formula = (this.joelho * 0.68) + (this.braco * 2.64) - 50.08
          }
        }
        break;

      case 'F':
        if (maioridade) {
          if (negro) {
            formula = (this.joelho * 1.24) + (this.braco * 2.97) - 82.48
          } else {
            formula = (this.joelho * 1.01) + (this.braco * 2.81) - 66.04
          }
        }

        else if (idoso) {
          if (negro) {
            formula = (this.joelho * 1.50) + (this.braco * 2.58) - 84.22
          } else {
            formula = (this.joelho * 1.09) + (this.braco * 2.68) - 65.51
          }
        }

        else {
          if (negro) {
            formula = (this.joelho * 0.71) + (this.braco * 2.59) - 50.43
          } else {
            formula = (this.joelho * 0.77) + (this.braco * 2.47) - 50.16
          }
        }
        break;
    }
    return formula
  }

  altura = () => {
    let formula = undefined
    let maioridade = this.idade >= 18 && this.idade < 60
    let idoso = this.idade >= 60
    let negro = this.raca == 'NEGRO' || this.raca == 'PARDA' || this.raca == 'INDIGENA'

    switch (this.sexo) {
      case 'M':
        if (maioridade) {
          if (negro) {
            formula = 73.42 + (1.79 * this.joelho)
          } else {
            formula = 71.85 + (1.88 * this.joelho)
          }
        }

        else if (idoso) {
          formula = 60.65 + (2.04 * this.braco)
        }

        else {
          if (negro) {
            formula = 73.42 + (1.79 * this.joelho)
          } else {
            formula = 40.54 + (2.22 * this.joelho)
          }
        }
        break;
      case 'F':
        if (maioridade) {
          if (negro) {
            formula = 68.10 + (1.86 * this.joelho) - (0.06 * this.idade)
          } else {
            formula = 70.25 + (1.87 * this.joelho) - (0.06 * this.idade)
          }
        }

        else if (idoso) {
          formula = 84.88 - (0.24 * this.idade) + (1.83 * this.joelho)
        }

        else {
          if (negro) {
            formula = 68.10 + (1.86 * this.joelho) - (0.06 * this.idade)
          } else {
            formula = 43.21 + (2.15 * this.joelho)
          }
        }
        break;
    }

    return (formula / 100)
  }

  imc = (peso, altura) => {
    return peso / (altura ** 2)
  }

  pesoIdeal = (altura) => {
    let idoso = this.idade >= 60
    let formula = undefined
    switch (this.sexo) {
      case 'M':
        if (idoso) {
          formula = 24.5 * (altura ** 2)
        } else {
          formula = 22 * (altura ** 2)
        }
        break
      case 'F':
        if (idoso) {
          formula = 24.5 * (altura ** 2)
        } else {
          formula = 21 * (altura ** 2)
        }
        break
    }

    return formula
  }

  situacao = (imc) => {
    let situcacao = undefined
    let maioridade = this.idade >= 18 && this.idade < 60
    if (maioridade) {
      if (imc < 18.5) {
        situcacao = 'MAGREZA'
      } else if (imc >= 18.5 && imc <= 24.9) {
        situcacao = 'EUTROFIA'
      } else {
        situcacao = 'SOBREPESO'
      }
    } else {
      if (imc < 22) {
        situcacao = 'MAGREZA'
      } else if (imc >= 22 && imc <= 27) {
        situcacao = 'EUTROFIA'
      } else {
        situcacao = 'SOBREPESO'
      }
    }

    return situcacao
  }

}

module.exports = CalculosAntropometricos