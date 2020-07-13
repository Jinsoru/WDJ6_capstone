#!/bin/bash
{
    printf 'power off\n\n'
    sleep 1
    printf 'power on\n\n'
    sleep 1
    printf 'pariable no\n\n'
    sleep 1
    printf 'agent on\n\n'
    sleep 2
    printf 'exit'
} | bluetoothctl