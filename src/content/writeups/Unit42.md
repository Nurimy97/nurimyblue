---
title: "Unit42"
description: "In this very easy Sherlock, you will familiarize yourself with Sysmon logs and various useful EventIDs for identifying and analyzing malicious activities on a Windows system."
image: "../assets/sherlocks_htb_cover.webp"
createdAt: 09-28-2026
draft: false
tags:
  - HackTheBox
  - Very Easy
  - CDSA Path
---
***
## Scenario
In this Sherlock, you will familiarize yourself with Sysmon logs and various useful EventIDs for identifying and analyzing malicious activities on a Windows system. Palo Alto's Unit42 recently conducted research on an UltraVNC campaign, wherein attackers utilized a backdoored version of UltraVNC to maintain access to systems. This lab is inspired by that campaign and guides participants through the initial access stage of the campaign.

To answer the questions in this lab, you will only need the Event Viewer, with VirusTotal as an optional supplement. Below are some important Sysmon Event IDs that can be utilized in your analysis:

- Event ID 1: Process Creation/Execution. Includes process path, parent process path, and command-line arguments.
- Event ID 2: File Creation Time Changed. Includes the file making the change, the file to which the change is being made, tampered timestamp, and original timestamp.
- Event ID 3: Network Connection. Includes the process making the connection, destination IP Address, and port.
- Event ID 5: Process Termination. Includes the name of the process that was killed or terminated itself.
- Event ID 11: File Created. Includes the process creating the file, the file being created, and its full path.
- Event ID 22: DNS Query. Includes the process querying the domain, the target domain name, and the IP Addresses they resolve to.
***

>[!info]
> In order to have the correct time to answer properly the questions, we must **set the timezone to UTC**.

### Task 1
-How many Event logs are there with Event ID 11?

Import the Microsoft-Windows-Sysmon-Operational.evtx to Event viewer and filter by EventID 11 in "Filter Current Log".
### Task 2
- Whenever a process is created in memory, an event with Event ID 1 is recorded with details such as command line, hashes, process path, parent process path, etc. This information is very useful for an analyst because it allows us to see all programs executed on a system, which means we can spot any malicious processes being executed. What is the malicious process that infected the victim's system?

With the filter of the Task 1 applied, use "Find.." to look for **Downloads** and there willl be the malicious file.
### Task 3
-Which Cloud drive was used to distribute the malware?

Filter by **Event Code 22** ( DNS Query )and look for a cloud storage page.
### Task 4
- For many of the files it wrote to disk, the initial malicious file used a defense evasion technique called Time Stomping, where the file creation date is changed to make it appear older and blend in with other files. What was the timestamp changed to for the PDF file?

Look for **Event Code 2** ( A process changed a file creation time ) and the keyword **.pdf** in "Find...".
### Task 5
- The malicious file dropped a few files on disk. Where was "once.cmd" created on disk? Please answer with the full path along with the filename.

**Event Code 11** ( FileCreate )again and looking for "once.cmd"

### Task 6
- The malicious file attempted to reach a dummy domain, most likely to check the internet connection status. What domain name did it try to connect to?

Take the **Image binary** name from Task 5 and use it in conjunction with **Event Code 22** ( DNS Query )
### Task 7
- Which IP address did the malicious process try to reach out to?

Filter by **Event Code 3** ( Network connection detected ) and look for DestinationIp. There is only one log.
### Task 8
- The malicious process terminated itself after infecting the PC with a backdoored variant of UltraVNC. When did the process terminate itself?

Look for **Event Code 5** ( Process Terminated ) and there is only one log.
