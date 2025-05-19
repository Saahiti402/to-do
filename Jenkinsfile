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
    stage('Deploy to Kubernetes') {
      steps {
        script {
          // Update your Kubernetes deployment manifests with the newly built image tags if needed
          // For simplicity, assuming your manifests already use the 'latest' tags or you update them here

          // Apply frontend deployment YAML
          sh 'kubectl apply -f k8s/frontend-deployment.yaml'

          // Apply backend deployment YAML
          sh 'kubectl apply -f k8s/backend-deployment.yaml'
        }
      }
    }
  }
}
