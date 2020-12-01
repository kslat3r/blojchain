provider "google" {
  credentials = "./creds.json"
  project = "blojchain-297012"
  region = local.region
}

data "google_container_registry_repository" "blojchain-container-registery" {}

resource "google_container_cluster" "blojchain-cluster" {
  name = "blojchain-cluster"
  location = local.zone
  initial_node_count = local.initial_node_count
  
  node_config {
    machine_type = local.machine_type
    disk_size_gb = local.disk_size_gb
    oauth_scopes = local.oauth_scopes
  }
}

resource "google_dns_managed_zone" "blojchain" {
  name     = "blojchain"
  dns_name = "blojcha.in."
}

resource "google_dns_record_set" "blojchain-demo" {
  name         = "demo.blojcha.in."
  managed_zone = google_dns_managed_zone.blojchain.name
  type         = "A"
  ttl          = 300

  rrdatas = ["35.242.133.184"]
}

resource "google_dns_record_set" "blojchain-node-a" {
  name         = "node-a.blojcha.in."
  managed_zone = google_dns_managed_zone.blojchain.name
  type         = "A"
  ttl          = 300

  rrdatas = ["35.189.75.125"]
}

resource "google_dns_record_set" "blojchain-node-b" {
  name         = "node-b.blojcha.in."
  managed_zone = google_dns_managed_zone.blojchain.name
  type         = "A"
  ttl          = 300

  rrdatas = ["35.230.153.63"]
}

resource "google_dns_record_set" "blojchain-node-c" {
  name         = "node-c.blojcha.in."
  managed_zone = google_dns_managed_zone.blojchain.name
  type         = "A"
  ttl          = 300

  rrdatas = ["34.89.47.127"]
}