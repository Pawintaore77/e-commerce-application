# IAM role for Lambda execution
data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "lambda_function_role" {
  name               = "lambda_execution_role"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

data "archive_file" "lambda" {
type = "zip"
source_file = "index.js"
output_path = "lambda.zip"
}

resource "aws_lambda_function" "lambda" {
filename = data.archive_file.lambda.output_path
function_name = "my-first-tf-lambda-function"
role = aws_iam_role.lambda_function_role.arn
handler = "index.handler"

source_code_hash = data.archive_file.lambda.output_base64sha256

runtime = "nodejs18.x"
}