locals {
  region = "europe-west2"
  zone = "europe-west2-a"
  initial_node_count = 1
  machine_type = "n1-standard-1"
  disk_size_gb = 10
  oauth_scopes = [
    "https://www.googleapis.com/auth/cloud-platform"
  ]
}