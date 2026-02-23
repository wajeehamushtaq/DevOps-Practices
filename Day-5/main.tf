provider "aws" {
  region = "eu-north-1" # Match your ECR/EC2 region
}

# 1. Create a Security Group (The "Bouncer")
resource "aws_security_group" "mern_sg" {
  name        = "mern-security-group"
  description = "Allow web and ssh traffic"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # SSH
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # React/Nginx
  }
}

# 2. Create the EC2 Instance (The "Server")
resource "aws_instance" "mern_server" {
  ami           = "ami-0914547665e6a707c" # Amazon Linux 2023 AMI ID
  instance_type = "t3.micro"
  key_name      = "test" # Use your existing key name

  vpc_security_group_ids = [aws_security_group.mern_sg.id]

  tags = {
    Name = "Terraform-MERN-Server"
  }
}