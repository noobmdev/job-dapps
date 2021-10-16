// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JobCore {
    enum OBEJCTS {
        RECRUITER,
        CANDIDATE,
        JOB
    }
    
    struct Recuiter {
        uint id;
        string name;
        string headquarter;
        string companySize;
        string website;
        string contact;
        string addr;
        string logo;
    }
    
    // id => Recuiter
    mapping(uint => Recuiter) recuiters;
    
    uint public latestRecruiterId;
    
    address owner;
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can do that");
        _;
    }
    
    function addRecruiter(
        string memory _name, 
        string memory _headquarter, 
        string memory _companySize, 
        string memory _website, 
        string memory _contact, 
        string memory _addr, 
        string memory _logo
    ) public onlyOwner {
        latestRecruiterId++;
        recuiters[latestRecruiterId] = Recuiter({
            id: latestRecruiterId,
            name: _name,
            headquarter: _headquarter,
            companySize: _companySize,
            website: _website,
            contact: _contact,
            addr: _addr,
            logo: _logo
        });
    }
    
    
    
}