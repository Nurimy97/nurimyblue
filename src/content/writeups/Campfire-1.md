---
title: "Campfire-1"
description: "In this Very Easy Sherlock, players will go through artefacts and logs from the Domain controller as well as endpoint artefacts from where Kerberoast attack activity was sourced."
image: "../assets/sherlocks_htb_cover.webp"
createdAt: 09-30-2026
draft: false
tags:
  - HackTheBox
  - Very Easy
  - CDSA Preparation Path
---
***
## Scenario

Alonzo Spotted Weird files on his computer and informed the newly assembled SOC Team. Assessing the situation it is believed a Kerberoasting attack may have occurred in the network. It is your job to confirm the findings by analyzing the provided evidence.

You are provided with:

1- Security Logs from the Domain Controller

2- PowerShell-Operational Logs from the affected workstation

3- Prefetch Files from the affected workstation

***

> In order to have the correct time to answer properly the questions, we must **set the timezone to UTC**. The [Zimmerman's Tools](https://ericzimmerman.github.io/) are required also.

### Task 1
- Analyzing Domain Controller Security Logs, can you confirm the UTC date & time when the kerberoasting activity occurred?

Filter by `Event ID 4769` ( A Kerberos service ticket was requested ) and look for `0x17` in **Find..**. The first match is the response.
### Task 2
- What is the Service Name that was targeted?

The **service name** from Task 1 event.
### Task 3
- It is really important to identify the Workstation from which this activity occurred. What is the IP Address of the workstation? 

**Client address** from Task 1 event..
### Task 4
- Now that we have identified the workstation, a triage including PowerShell logs and Prefetch files are provided to you for some deeper insights so we can understand how this activity occurred on the endpoint. What is the name of the file used to Enumerate Active directory objects and possibly find Kerberoastable accounts in the network?

Look for `Event ID 4104` ( PowerShell Script Block Logging )  in the Powershell Operational logs.

### Task 5
-When was this script executed? (UTC)

From the events from Task 4, the first event is a policy execution bypass in order to execute the script for the first time, so the second event has the first execution of the script.
### Task 6
- What is the full path of the tool used to perform the actual kerberoasting attack?

First we must parse the prefetch files with `Eric Zimmerman's PECmd` to convert them into csv and then open it with Timeline explorer.

``` ruby
.\PECmd.exe -d "C:\Users\Nurimy\Downloads\Triage\Workstation\2024-05-21T033012_triage_asset\C\Windows\prefetch\" --csv C:\Users\Nurimy\Desktop\ --csvf result.csv
```

Once inside Timeline explorer look for any suspicious  .exe file.

### Task 7
- When was the tool executed to dump credentials? (UTC)

Look for the `last run` of the executable.

