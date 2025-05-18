pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "todo-frontend:latest"
        CONTAINER_NAME = "todo-frontend-container"
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out source code..."
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing npm dependencies..."
                script {
                    def status = sh(script: 'npm install', returnStatus: true)
                    if (status != 0) {
                        error "npm install failed! Please check your package.json and network connectivity."
                    }
                }
            }
        }

        stage('Build') {
            steps {
                echo "Running build script..."
                script {
                    def status = sh(script: 'npm run build', returnStatus: true)
                    if (status != 0) {
                        error "Build failed! Check your React build scripts."
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image ${env.DOCKER_IMAGE}..."
                script {
                    def status = sh(script: "docker build -t ${env.DOCKER_IMAGE} .", returnStatus: true)
                    if (status != 0) {
                        error "Docker build failed!"
                    }
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                echo "Stopping and removing existing container if it exists..."
                script {
                    sh """
                        if [ \$(docker ps -q -f name=${env.CONTAINER_NAME}) ]; then
                            docker rm -f ${env.CONTAINER_NAME}
                        fi
                    """
                }

                echo "Starting new container ${env.CONTAINER_NAME} from image ${env.DOCKER_IMAGE}..."
                script {
                    def status = sh(script: "docker run -d -p 3000:80 --name ${env.CONTAINER_NAME} ${env.DOCKER_IMAGE}", returnStatus: true)
                    if (status != 0) {
                        error "Failed to run Docker container!"
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully! Frontend app is running in Docker container."
        }
        failure {
            echo "Pipeline failed. Please check the logs above."
        }
        always {
            echo "Cleaning up workspace..."
            cleanWs()
        }
    }
}
