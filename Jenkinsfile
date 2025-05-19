pipeline {
  agent any

  environment {
    REGISTRY = "saahitiks"
    IMAGE_NAME_FRONTEND = "todo-frontend"
    IMAGE_NAME_BACKEND = "todo-backend"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Frontend Image') {
      steps {
        dir('frontend') {
          script {
            docker.build("${REGISTRY}/${IMAGE_NAME_FRONTEND}:latest")
          }
        }
      }
    }

    stage('Build Backend Image') {
      steps {
        dir('backend') {
          script {
            docker.build("${REGISTRY}/${IMAGE_NAME_BACKEND}:latest")
          }
        }
      }
    }

    stage('Push Images') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          script {
            docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-creds') {
              docker.image("${REGISTRY}/${IMAGE_NAME_FRONTEND}:latest").push()
              docker.image("${REGISTRY}/${IMAGE_NAME_BACKEND}:latest").push()
            }
          }
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        withKubeConfig([credentialsId: 'kubeconfig-creds']) {
          sh 'kubectl apply -f k8s/'
        }
      }
    }
  }
}
