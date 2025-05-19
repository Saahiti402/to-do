pipeline {
  agent any
  stages {
    stage('Build Frontend Image') {
      steps {
        dir('frontend') {
          sh 'docker build -t todo-frontend:latest .'
        }
      }
    }
    stage('Build Backend Image') {
      steps {
        dir('backend') {
          sh 'docker build -t todo-backend:latest .'
        }
      }
    }
  }
}
