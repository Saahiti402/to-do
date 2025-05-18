pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("todo-frontend:latest")
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    // Stop & remove container if already running
                    sh 'docker rm -f todo-frontend-container || true'
                    // Run container from built image
                    sh 'docker run -d -p 3000:80 --name todo-frontend-container todo-frontend:latest'
                }
            }
        }
    }
}

