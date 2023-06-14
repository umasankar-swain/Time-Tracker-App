pipeline {
  agent any
  tools {
    nodejs "node"
  }
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
    stage('Build Artifacts') {
      steps {
        sh 'npm run build'
      }
    }
  }
}
