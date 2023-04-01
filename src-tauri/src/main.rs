// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{fs::File, io::Read};

/**
* DSLogHeader structure
* 0x00 - Version u32
* 0x04 - Unknown
* 0x08 - Timestamp u32
* 0x0C - Fractional Seconds u8
* 0x0D - Unknown u8[7]
*/

struct DSLogHeader {
    version: u32,
    unknown: u32,
    timestamp: u32,
    fractional_seconds: u8,
    unknown2: [u8; 7],
}

/**
* DSLogEntry structure
* 0x00 - Trip Time u8
* 0x01 - Packet Loss % u8
* 0x02 - Battery Battery
* 0x04 - Robo Rio % u8
* 0x05 - Trace Trace
* 0x06 - CAN Percent u8
* 0x07 - Wifi dB u8
* 0x08 - Wifi Mb u8
* 0x0a - unknown u8[2]
* 0x0c - PDP Stats PDPStats
* 0x21 - unknown u8[3]
*/

struct DSLogEntry {
    trip_time: u8,
    packet_loss: u8,
    battery: Battery,
    roborio: u8,
    trace: Trace,
    can: u8,
    wifi_db: u8,
    wifi_mb: u8,
    unknown: [u8; 2],
    pdp_stats: PDPStats,
    unknown2: [u8; 3],
}

struct Battery {
    voltage: u16,
    current: u16,
}

struct PDPStats {
    first6: [u8; 8],
    next6: [u8; 8],
    last4: [u8; 5],
}

/**
* Trace structure
*/

struct Trace {
    brownout: bool,
    watchdog: bool,
    dsteleop: bool,
    unused: bool,
    dsdisabled: bool,
    robotteleop: bool,
    robotauton: bool,
    robotdisabled: bool,
}

struct LogContents {
    header: DSLogHeader,
    entries: Vec<DSLogEntry>,
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
