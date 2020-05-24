import Sequelize from 'sequelize'
import fs from 'fs'
import path from 'path'

let database = null

const loadModels = (sequelize) => {
  
  // Retorna o endereço path do diretório models
  const dir = path.join(__dirname, '../models')
  
  let models = []

  // Ler todos os arquivos do diretório models
  fs.readdirSync(dir).forEach(arquivo => {
    
    // Monta um path para cada um dos arquivos
    const modelDir = path.join(dir, arquivo)
    
    // Importa o model para o sequelize 
    const model = sequelize.import(modelDir)
    
    // Atribui o model importado para o array de models  
    models[model.name] = model
  })

  return models
}

export default (app) => {
  if (!database) {
    
    // Passa as configurações do app para a constatante config
    const config = app.config

    // Configura e instância o Sequelize
    const sequelize = new Sequelize (
      config.database,
      config.username,
      config.password,
      config.params
    )

    // Atribui ao database uma instancia do Sequilize, a biblioteca e um objeto models
    database = {
      sequelize,
      Sequelize,
      models: {}
    }

    // Carrga os modelos de forma dinamica para propriedade models
    database.models = loadModels(sequelize)
    sequelize.sync({ force: false }).done(() => database)
  }

  return database
}