#!/bin/bash
{ printf 'power off\n\n'
	sleep 2
	printf 'power on\n\n'
	sleep 2
	printf 'pairable no\n\n'
	sleep 2
	printf 'pairable no\n\n'
	sleep 2
	printf 'agent on\n\n'
	sleep 2
	printf 'exit'
} | bluetoothctl
